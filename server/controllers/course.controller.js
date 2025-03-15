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
