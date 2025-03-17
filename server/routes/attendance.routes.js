import express from "express";
import { checkIn , checkOut, fetchAttendanceOfStudent, fetchAttendanceStats} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/checkIn/:batchId/:studentId", checkIn)
router.post("/checkOut/:batchId/:studentId", checkOut)
router.get("/:studentId", fetchAttendanceOfStudent)
router.get("/student/stats", fetchAttendanceStats)

export default router;
