import Course from "../models/course.model.js";

export const fetchCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ title: 1 });
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCourses = async (req, res) => {
  const { title, description = "", teachers  =[] } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Course title is required" });
    }
    const course = await Course.findOne({ title });
    if (course) {
      return res.status(400).json({ message: "Course already added" });
    }
    const newCourse = new Course({ title, description,teachers  });
    await newCourse.save();
    return res
      .status(200)
      .json({ course: newCourse, message: "Added new course" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
