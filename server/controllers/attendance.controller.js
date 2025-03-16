import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import dayjs from "dayjs";
import {
  COLLEGE_CHECK_IN_TIME,
  COLLEGE_CHECK_OUT_TIME,
  convertMinutesToHoursMinutes,
  convertToDateOnly,
  convertUTCtoIST,
  getTimeDifference,
} from "../utils/date.js";
import Batch from "../models/batch.model.js";
import { FULL_DAY_ATTENDANCE_TIME } from "../constant/constant.js";

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

    const formattedDate = convertToDateOnly(checkInDate);

    const attendance = await Attendance.findOne({
      batch: batchId,
      student: studentId,
      date: formattedDate,
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
      date: formattedDate,
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

export const checkOut = async (req, res) => {
  const { batchId, studentId } = req.params;
  const { checkOutDate } = req.body;
  try {
    if (!batchId || !studentId) {
      return res.status(400).json({
        message: "Student Id and Batch Id are required",
      });
    }

    if (!checkOutDate) {
      return res.status(400).json({
        message: "Check Out date is required",
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

    const formattedDate = convertToDateOnly(checkOutDate);

    const attendance = await Attendance.findOne({
      batch: batchId,
      student: studentId,
      date: formattedDate,
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "Cannot checkout before check in" });
    }

    if (!attendance?.checkedIn) {
      return res.status(400).json({ message: "Already checked out today" });
    }

    if (!attendance.checkInTime) {
      return res.status(400).json({ message: "Invalid check-in time" });
    }

    const checkOutTime = convertUTCtoIST(checkOutDate);
    if (
      dayjs(checkOutTime).isBefore(attendance.checkInTime) ||
      dayjs(checkOutTime).isSame(attendance.checkInTime)
    ) {
      return res
        .status(400)
        .json({ message: "Checkout time should be after check in time" });
    }

    const collegeCheckoutTime = convertUTCtoIST(COLLEGE_CHECK_OUT_TIME);
    const timeDifference = getTimeDifference(
      attendance.checkInTime,
      checkOutTime
    );

    const totalTime = convertMinutesToHoursMinutes(timeDifference);

    if (
      Number(timeDifference) < Number(FULL_DAY_ATTENDANCE_TIME) ||
      dayjs(checkOutTime).isBefore(collegeCheckoutTime)
    ) {
      attendance.status = "absent";
    }
    attendance.checkOutTime = checkOutTime;
    attendance.checkedIn = false;
    attendance.totalTime = totalTime;

    await attendance.save();
    return res
      .status(200)
      .json({ message: "Checked out successfully", attendance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
