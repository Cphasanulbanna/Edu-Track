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
import { FULL_DAY_ATTENDANCE_TIME, HALF_DAY_ATTENDANCE_TIME } from "../constant/constant.js";
import Holiday from "../models/holiday.model.js";
import mongoose from "mongoose"

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
    const dayOfWeek = dayjs(formattedDate).day();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({
        message: "Check-in is not allowed on weekends (Saturday & Sunday)",
      });
    }

    const isHoliday = await Holiday.findOne({ date: formattedDate });
    if (isHoliday) {
      return res.status(400).json({
        message: `Check-in is not allowed on holidays (${isHoliday.description})`,
      });
    }

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

    if (Number(timeDifference) >= Number(FULL_DAY_ATTENDANCE_TIME)) {
         attendance.status = "present";
    }

    if (Number(timeDifference) <= Number(HALF_DAY_ATTENDANCE_TIME)) {
      attendance.status = "present"
      attendance.isHalfDay = true
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

export const fetchAttendanceOfStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    if (!studentId) {
      return res.status(400).json({ message: "Student Id is required" });
    }
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendances = await Attendance.find({ student: student }).sort({
      date: -1,
    });
    if (!attendances.length) {
      return res.status(404).json({ message: "Attendance records not found" });
    }

    return res.status(404).json({ attendances });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAttendanceStats = async (req, res) => {
  const { studentId, startDate, endDate } = req.query;
  try {
    if (!studentId || !startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Student ID and date range are required" });
    }
    const start = convertToDateOnly(startDate);
    const end = convertToDateOnly(endDate);

    if (dayjs(end).isBefore(start)) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date" });
    }

    const attendanceStats = await Attendance.aggregate([
      {
        $match: {
          student: mongoose.Types.ObjectId.createFromHexString(studentId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "studentDetails",
        },
      },
      {
        $unwind: "$studentDetails", // Convert array into an object
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const workingDaysAggregation = [
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          holidays: { $push: "$date" },
        },
      },
    ];

    const holidayData = await Holiday.aggregate(workingDaysAggregation);
    const holidaySet = new Set(holidayData?.[0]?.holidays || []);

    const totalWorkingDays = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          dayOfWeek: { $dateFromString: { dateString: "$date" } },
        },
      },
      {
        $match: {
          $and: [
            {
              dayOfWeek: { $ne: 1 },
            },
            {
              dayOfWeek: { $ne: 7 },
            },
            {
              date: { $nin: [...holidaySet] },
            },
          ],
        },
      },
      {
        $count: "totalWorkingDays",
      },
    ]);

    const totalDays = totalWorkingDays[0]?.totalWorkingDays || 0;

    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;
    let attendancePercentage = 0
    let leavePercentage = 0
    let absentPercentage = 0
    let latePercentage = 0
    let averageAttendancePerWeek = 0

    attendanceStats?.forEach(({ _id, count }) => {
      if (_id === "present") present = count;
      if (_id === "absent") absent = count;
      if (_id === "late") late = count;
      if (_id === "leave") leave = count;
    });

    attendancePercentage = totalDays > 0 ? (present / totalDays) * 100 : 0
    leavePercentage = totalDays > 0 ? (leave / totalDays) * 100 : 0
    absentPercentage = totalDays > 0 ? (absent / totalDays) * 100 : 0
    latePercentage = totalDays > 0 ? (late / totalDays) * 100 : 0
    averageAttendancePerWeek = totalDays > 0 ? (present*5)/totalDays:0

    return res.status(200).json({
      totalWorkingDays: totalDays,
      present,
      absent,
      late,
      leave,
      attendancePercentage,
      leavePercentage,
      absentPercentage,
      latePercentage,
      averageAttendancePerWeek
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
