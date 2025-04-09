import Course from "../models/course.model.js";
import Semester from "../models/semester.model.js";

export const createSemester = async (req, res) => {
  const { semesterNumber, courseId, feeAmount } = req.body;
  try {
    if (!courseId || !semesterNumber || !feeAmount) {
      return res.status(400).json({
        message: "Course Id , fee amount and semester number is required",
      });
    }
    if (semesterNumber < 0 || semesterNumber > 6) {
      return res
        .status(400)
        .json({ message: "Semester number must be between 1 to 6" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const semester = await Semester.findOne({
      course: courseId,
      semesterNumber,
    });

    if (semester) {
      return res.status(400).json({ message: "Semester already exists" });
    }
    const newSemester = new Semester({
      course: courseId,
      semesterNumber,
      feeAmount,
    });
    await newSemester.save();
    return res.status(201).json({ message: "New semester created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchSemesterByCourse = async (req, res) => {
  const { courseId } = req.query;
  try {
    if (!courseId) {
      return res.status(400).json({ message: "Course Id is required" });
    }

    const semesters = await Semester.find({
      course: courseId,
    }).populate("course");

    if (!semesters.length) {
      return res.status(400).json({ message: "Semesters not found" });
    }
    return res.status(200).json({ semesters });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
