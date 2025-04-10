import mongoose from "mongoose";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

export const fetchCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .sort({ title: 1 })
      .select("-__v -updatedAt -createdAt");
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) },
      },
      {
        $lookup: {
          from: "semesters",
          localField: "semesters",
          foreignField: "_id",
          as: "semesters",
        },
      },
      {
        $addFields: {
          semesters: {
            $map: {
              input: "$semesters",
              as: "sem",
              in: {
                _id: "$$sem._id",
                feeAmount: "$$sem.feeAmount",
                semesterNumber: "$$sem.semesterNumber",
              },
            },
          },
          totalSemesters: { $size: "$semesters" },
          totalCourseFee: { $sum: "$semesters.feeAmount" },
        },
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);

    if (!course.length) {
      return res.status(404).json({ message: "No course found" });
    }
    return res.status(200).json({ data: course?.[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCourses = async (req, res) => {
  const { title, description = "", teachers = [], duration = 3 } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Course title is required" });
    }
    const course = await Course.findOne({ title });
    if (course) {
      return res.status(400).json({ message: "Course already added" });
    }
    const newCourse = new Course({ title, description, teachers, duration });
    await newCourse.save();
    return res
      .status(201)
      .json({ course: newCourse, message: "Added new course" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const enrollCourse = async (req, res) => {
  const { courseId } = req.query;
  const { userIds } = req.body;
  try {
    if (!courseId || !userIds) {
      return res
        .status(400)
        .json({ message: "course Id and studentIds are required" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    await User.updateMany(
      { _id: { $in: userIds }, course: { $exists: false } },
      { $set: { course: courseId } }
    );
    return res.status(200).json({ message: "Courses added to students" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const courseId = mongoose.Types.ObjectId.createFromHexString(id);
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "No courses found" });
    }
    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
