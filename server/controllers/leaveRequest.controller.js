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
