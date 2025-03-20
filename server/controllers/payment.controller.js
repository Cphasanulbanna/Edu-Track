import { v4 as uuidV4 } from "uuid";
import { razorpay } from "../config/razorpay.js";
import crypto from "node:crypto";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import Payment from "../models/payment.model.js";
import Semester from "../models/semester.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;
  const { feeType, semesterId, studentId } = req.query;
  const uuid = uuidV4();
  try {
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }
    if (!feeType || !studentId) {
      return res
        .status(400)
        .json({ message: "Fee Type and Student Id is required" });
    }
    if (feeType === "SEMESTER_FEES") {
      if (!semesterId) {
        return res.status(400).json({ message: "Semester Id is required" });
      }
      const semester = await Semester.findById(semesterId);
      if (amount !== semester.feeAmount) {
        return res
          .status(400)
          .json({ message: `Semester fee should be ${semester.feeAmount}` });
      }
    }

    const paymentRecord = new Payment({
      student: mongoose.Types.ObjectId.createFromHexString(studentId),
      semester: semesterId
        ? mongoose.Types.ObjectId.createFromHexString(semesterId)
        : null,
      amount,
      feeType,
      status: "pending",
      paymentDate: dayjs(Date.now()).format("YYYY-MM-DD"),
    });

    await paymentRecord.save();

    const notes = {
      feeType,
      semesterId,
      studentId,
    };

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `${feeType}-${uuid?.slice(0, 20)}`,
      notes,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    paymentRecord.transactionId = order?.id;
    await paymentRecord.save();
    return res.status(201).json({ order });
  } catch (error) {
    console.log({ error: error });

    return res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Razorpay order Id, payment Id and signature is required",
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.status(200).json({ message: "Payment verified" });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handlePaymentSuccess = async (payload) => {
  console.log({ successPayload: payload });

  await Payment.findOneAndUpdate(
    { transactionId: payload?.id },
    {
      student: mongoose.Types.ObjectId.createFromHexString(
        payload?.notes?.studentId
      ),
      semester: payload?.notes?.semesterId
        ? mongoose.Types.ObjectId.createFromHexString(
            payload?.notes?.semesterId
          )
        : null,
      amount: parseFloat((payload?.amount / 100).toFixed(2)),
      feeType: payload?.notes?.feeType,
      status: "paid",
      method: payload?.method,
    }
  );
};

const handlePaymentFailure = async (payload) => {
  console.log({ failurePayload: payload });
  await Payment.findOneAndUpdate(
    { transactionId: payload?.order_id },
    {
      student: mongoose.Types.ObjectId.createFromHexString(
        payload?.notes?.studentId
      ),
      semester: payload?.notes?.semesterId
        ? mongoose.Types.ObjectId.createFromHexString(
            payload?.notes?.semesterId
          )
        : null,
      amount: parseFloat((payload?.amount / 100).toFixed(2)),
      feeType: payload?.notes?.feeType,
      status: "failed",
      method: payload?.method,
    }
  );
};

export const handlePaymentStatus = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const isValid = validateWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.RAZORPAY_WEBHOOK_SECRET
  );

  try {
    if (isValid) {
      console.log({ isValid });

      const { event, payload } = req.body;

      switch (event) {
        case "order.paid":
          handlePaymentSuccess(payload?.order?.entity);
          break;
        case "payment.failed":
          handlePaymentFailure(payload?.payment?.entity);
          break;
        default:
          break;
      }
      return res.status(200).json({ message: "Webhook received successfully" });
    } else {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllTransactions = async (req, res) => {
  const { status = "", date, page = 1, limit = 2 } = req.query;
  const elementsToSkip = (page - 1) * limit;
  const matchStage = {};
  if (status) {
    matchStage.status = status;
  }
  if (date) {
    const formattedDate = dayjs(date, "DD-MM-YYYY")
      .format("YYYY-MM-DD")
      .toString();
    matchStage.paymentDate = formattedDate;
  }
  try {
    const aggregationPipeline = [
      {
        $facet: {
          transactions: [
            {
              $match: { ...matchStage },
            },
            {
              $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $lookup: {
                from: "profiles",
                localField: "user.profile",
                foreignField: "_id",
                as: "profile",
              },
            },
            { $unwind: "$profile" },
            {
              $lookup: {
                from: "semesters",
                localField: "semester",
                foreignField: "_id",
                as: "semester",
              },
            },
            { $unwind: "$semester" },
            {
              $sort: {
                paymentDate: -1,
              },
            },
            {
              $project: {
                amount: 1,
                status: 1,
                paymentDate: 1,
                feeType: 1,
                semester: {
                  semesterNumber: "$semester.semesterNumber",
                  feeAmount: "$semester.feeAmount",
                },
                student: {
                  firstName: "$profile.first_name",
                  lastName: "$profile.last_name",
                },
                transactionId: 1,
              },
            },
            {
              $skip: elementsToSkip,
            },
            {
              $limit: limit,
            },
          ],
          totalPaidAmount: [
            {
              $match: { status: "paid" },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$amount" },
              },
            },
          ],
          totalTransactions: [
            {
              $count: "count",
            },
          ],
          totalSuccessfulTransactions: [
            {
              $match: { status: "paid" },
            },
            {
              $count: "count",
            },
          ],
          totalFailedTransactions: [
            {
              $match: { status: "failed" },
            },
            {
              $count: "count",
            },
          ],
        },
      },
    ];
    const [result] = await Payment.aggregate(aggregationPipeline);
    const {
      transactions,
      totalPaidAmount,
      totalSuccessfulTransactions,
      totalFailedTransactions,
      totalTransactions,
    } = result;

    if (!transactions?.length) {
      return res.status(404).json({ message: "No transactions found" });
    }
    const totalPages = Math.ceil(
      totalSuccessfulTransactions?.[0]?.count / limit
    );
    return res.status(200).json({
      transactions: transactions,
      totalPaidAmount: totalPaidAmount[0].total,
      totalSuccessfulTransactions: totalSuccessfulTransactions?.[0]?.count,
      totalFailedTransactions: totalFailedTransactions?.[0]?.count,
      totalTransactions: totalTransactions?.[0]?.count,
      page,
      limit,
      totalPages,
      itemsInPage: totalSuccessfulTransactions?.[0]?.count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchTransactionsOfStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    if (!studentId) {
      return res.status(400).json({ message: "Student Id is required" });
    }
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const transactions = await Payment.find({ student: studentId }).sort({
      paymentDate: -1,
    });
    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
