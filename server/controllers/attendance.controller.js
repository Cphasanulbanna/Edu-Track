import { COLLEGE_CHECK_IN_TIME } from "../constant/constant.js";
import Attendance from "../models/attendance.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import dayjs from "dayjs";
import { getTimeFromDate } from "../utils/date.js";

export const checkedIn = async (req, res) => {
  const { courseId, studentId } = req.params;
  const { checkInDate } = req.body;
  try {
    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "Student Id and Class Id are required",
      });
    }

    if (!checkInDate) {
      return res.status(400).json({
        message: "Check in date is required",
      });
    }

    const attendance = await Attendance.findOne({
      class: courseId,
      student: studentId,
      date: checkInDate,
    });
    if (attendance.checkedIn) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const checkInTime = getTimeFromDate(checkInDate);

    if (dayjs(checkInTime).isAfter(COLLEGE_CHECK_IN_TIME)) {
      return res
        .status(400)
        .json({ message: "Check in failed, Cannot check in after 9:00 AM" });
    }
    const newAttendance = new Attendance({
      checkedIn: true,
      checkInTime: checkInTime,
      date: checkInDate,
      student: studentId,
      class: courseId,
    });

    await newAttendance.save();
    return res
      .status(201)
      .json({ message: "Checked in successfully", attendance: newAttendance });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
