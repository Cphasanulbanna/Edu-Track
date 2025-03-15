import express from "express";
import {  createDepartment, fetchAllDepartments } from "../controllers/department.controller.js";

const router = express.Router();

router.get("/", fetchAllDepartments)
router.post("/:courseId", createDepartment)

export default router;
