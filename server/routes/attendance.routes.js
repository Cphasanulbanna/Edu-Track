import express from "express";
import { checkIn } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/checkIn/:batchId/:studentId", checkIn)

export default router;
