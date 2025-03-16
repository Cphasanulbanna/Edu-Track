import Batch from "../models/batch.model.js";
import LeaveRequest from "../models/leaveRequest.model.js";
import { convertToDateOnly } from "../utils/date.js";

export const applyLeave = async (req, res) => {
  const { userId, batchId } = req.params;
  const { fromDate, toDate, reason } = req.body;
  try {
    if (!userId || !batchId) {
      return res.status(400).json({ message: "Batch and User ID is required" });
    }

    if (!fromDate || !toDate || !reason) {
      return res
        .status(400)
        .json({ message: "From date, To date and reason are required" });
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const formattedFromDate = convertToDateOnly(fromDate);
    const formattedToDate = convertToDateOnly(toDate);

    const leave = await LeaveRequest.findOne({
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      user: userId,
      batch: batchId,
    });
    if (leave) {
      return res
        .status(400)
        .json({ message: "You have already applied leave for these dates" });
    }

    const newLeaveRequest = new LeaveRequest({
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      reason,
      user: userId,
      batch: batchId,
      status: "pending",
    });

    await newLeaveRequest.save();
    return res
      .status(201)
      .json({ message: "Leave applied", leaveRequest: newLeaveRequest });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const takeActionOnLeave = async (req, res) => {
  console.log("entered");

  const { leaveRequestId } = req.params;
  const { status } = req.body;
  try {
    if (!leaveRequestId) {
      return res.status(400).json({ message: "Leave request id is required" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const leave = await LeaveRequest.findById(leaveRequestId);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leave.status = status;
    await leave.save();
    return res.status(200).json({ message: `Leave request ${status}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllLeaveRequestOfUser = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const leaves = await LeaveRequest.find({ user: userId }).select("-__v -updatedAt -batch").sort({
      toDate: -1,
    })
    if (!leaves.length) {
      return res.status(404).json({ message: "No leave requests found" });
    }

    return res.status(200).json({ leaves });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
