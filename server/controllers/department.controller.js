import Course from "../models/course.model";
import User from "../models/user.model";

export const addStudentToDepartment = async (req, res) => {
  const { departmentId, studentId } = req.params;
  try {
    if (!departmentId || !studentId) {
      return res
        .status(400)
        .json({ message: "Department and Student Ids are required" });
    }

    const student = await User.findById(studentId);
    if (student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.department) {
      return res
        .status(404)
        .json({ message: "Student is already added into another department" });
    }
    const department = await Course.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    student.department = departmentId;
    await student.save();

    department.students.push(studentId);
    await department.save();

    return res.status(200).json({ message: "Student added to department" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
