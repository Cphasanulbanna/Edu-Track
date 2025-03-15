import Department from "../models/department.model.js";
import User from "../models/user.model.js";

export const createDepartment = async (req, res) => {
  const { name, course, year } = req.body;
  try {
    if (!name || !year || !course) {
      return res
        .status(400)
        .json({ message: "Department name, course and year is required" });
    }

    const department = await Department.findOne({ name, year, course });
    if (department) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const newDepartment = new Department({ name, course, year });
    await newDepartment.save();
    return res.status(201).json({
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}).sort(1);
    if (!departments.length) {
      return res.status(404).json({ message: "No departments found" });
    }
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
    const department = await Department.findById(departmentId);
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
