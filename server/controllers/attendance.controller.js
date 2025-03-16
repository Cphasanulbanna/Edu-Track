import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import dayjs from "dayjs";
import {
  COLLEGE_CHECK_IN_TIME,
  convertUTCtoIST,
} from "../utils/date.js";
import Batch from "../models/batch.model.js";

export const checkIn = async (req, res) => {
  const { batchId, studentId } = req.params;
  const { checkInDate } = req.body;
  try {
    if (!batchId || !studentId) {
      return res.status(400).json({
        message: "Student Id and Batch Id are required",
      });
    }

    if (!checkInDate) {
      return res.status(400).json({
        message: "Check in date is required",
      });
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendance = await Attendance.findOne({
      batch: batchId,
      student: studentId,
      date: checkInDate,
    });
    if (attendance?.checkedIn) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const checkInTime = convertUTCtoIST(checkInDate);
    const fixedTime = convertUTCtoIST(COLLEGE_CHECK_IN_TIME);

    if (dayjs(checkInTime).isAfter(fixedTime)) {
      return res
        .status(400)
        .json({ message: "Check in failed, Cannot check in after 9:00 AM" });
    }
    const newAttendance = new Attendance({
      checkedIn: true,
      checkInTime: checkInTime,
      date: checkInDate,
      student: studentId,
      batch: batchId,
    });

    await newAttendance.save();
    return res
      .status(201)
      .json({ message: "Checked in successfully", attendance: newAttendance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
