import Batch from "../models/batch.model.js";
import Department from "../models/department.model.js";
import User from "../models/user.model.js";

export const createBatch = async (req, res) => {
  const { departmentId } = req.params;
  const { year } = req.body;
  try {
    if (!year) {
      return res.status(400).json({ message: "Batch year is required" });
    }
    if (!["1", "2", "3"]?.includes(year)) {
      return res
        .status(400)
        .json({ message: "Batch year should be '1', '2' or '3' " });
    }
    if (!departmentId) {
      return res
        .status(400)
        .json({ message: "Department id is required is required" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res
        .status(404)
        .json({ message: `Department not found with id ${departmentId}` });
    }

    const batchName = `${department?.name?.split("-")?.at(0)} - ${year}`;

    const batch = await Batch.findOne({ title: batchName });
    if (batch) {
      return res.status(400).json({
        message: `Batch already exists with the name of  ${batchName}`,
      });
    }

    const newBatch = new Batch({
      title: batchName,
      year: year,
    });
    await newBatch.save();
    return res
      .status(201)
      .json({ message: "New Batch created", batch: newBatch });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchBatch = async (req, res) => {
  try {
    const batches = await Batch.find({}).populate({
      path: "students",
      select: "email",
      populate: { path: "profile", select: "first_name last_name" },
    });
    if (!batches.length) {
      return res.status(404).json({ message: `No batch found` });
    }
    return res.status(200).json({ batches });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addStudentToBatch = async (req, res) => {
  const { batchId, studentId } = req.params;
  try {
    if (!batchId || !studentId) {
      return res
        .status(400)
        .json({ message: "Batch and Student Ids are required" });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.batch) {
      return res
        .status(404)
        .json({ message: "Student is already added into another batch" });
    }
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    student.batch = batchId;
    await student.save();

    batch.students.push(studentId);
    await batch.save();

    return res.status(200).json({ message: "Student added to department" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
