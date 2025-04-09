import express from "express";
import { addStudentToBatch, createBatch, fetchBatch } from "../controllers/batch.controller.js";

const router = express.Router();

router.get("/", fetchBatch)
router.post("/:departmentId", createBatch)
router.post("/add-students/:batchId", addStudentToBatch)

export default router;
