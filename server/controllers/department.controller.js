import Course from "../models/course.model.js";
import Department from "../models/department.model.js";

export const createDepartment = async (req, res) => {
  const { courseId } = req.params;
  try {
    if (!courseId) {
      return res.status(400).json({ message: "Course Id is required" });
    }

    const course = await Course.findById(courseId)
      .populate("title")
      .select("-__v -description -duration -createdAt -updatedAt");
    if (!course) {
      return res
        .status(400)
        .json({ message: `Course not found with id: ${courseId}` });
    }

    const departmentName = `${course.title} - Department`;

    const department = await Department.findOne({
      name: departmentName,
      course,
    });
    if (department) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const newDepartment = new Department({ name: departmentName, course });
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
    const departments = await Department.find({}).populate({path: "course", select: "duration title" }).select("-__v").sort("1");
    if (!departments.length) {
      return res.status(404).json({ message: "No departments found" });
    }
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
