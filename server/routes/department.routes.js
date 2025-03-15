import express from "express";
import { addStudentToDepartment, createDepartment, fetchAllDepartments } from "../controllers/department.controller.js";

const router = express.Router();

router.get("/", fetchAllDepartments)
router.post("/", createDepartment)
router.post("/:departmentId/:studentId", addStudentToDepartment)

export default router;
