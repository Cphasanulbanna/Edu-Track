import express from "express";
import { checkIn , checkOut, fetchAttendanceOfStudent} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/checkIn/:batchId/:studentId", checkIn)
router.post("/checkOut/:batchId/:studentId", checkOut)
router.post("/:studentId", fetchAttendanceOfStudent)
// router.get("/:studentId", fetchAttendanceOfStudent)

export default router;
