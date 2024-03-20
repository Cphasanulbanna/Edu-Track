import { v4 as uuidV4 } from "uuid";
import { razorpay } from "../config/razorpay.js";
import crypto from "node:crypto";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import Payment from "../models/payment.model.js";
import mongoose from "mongoose";

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
    }

    const paymentRecord = new Payment({
      student: mongoose.Types.ObjectId.createFromHexString(studentId),
      semester: semesterId
        ? mongoose.Types.ObjectId.createFromHexString(semesterId)
        : null,
      amount,
      feeType,
      status: "pending",
    });

    await paymentRecord.save();

    const notes = {
      feeType,
      semesterId,
      studentId,
    };

    const options = {
      amount,
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
  const paymentRecord = new Payment({
    student: mongoose.Types.ObjectId.createFromHexString(
      payload?.notes?.studentId
    ),
    semester: payload?.notes?.semesterId
      ? mongoose.Types.ObjectId.createFromHexString(payload?.notes?.semesterId)
      : null,
    amount: payload?.notes?.amount,
    feeType: payload?.notes?.feeType,
    status: "paid",
  });
  await paymentRecord.save();
};

const handlePaymentFailure = async (payload) => {
  const paymentRecord = new Payment({
    student: mongoose.Types.ObjectId.createFromHexString(
      payload?.notes?.studentId
    ),
    semester: payload?.notes?.semesterId
      ? mongoose.Types.ObjectId.createFromHexString(payload?.notes?.semesterId)
      : null,
    amount: payload?.notes?.amount,
    feeType: payload?.notes?.feeType,
    status: "failed",
  });
  await paymentRecord.save();
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
