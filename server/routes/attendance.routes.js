import express from "express";
import { checkedIn } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/checkIn/:classId/:studentId", checkedIn)

export default router;
