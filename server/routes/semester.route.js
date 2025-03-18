import express from "express";
import { createSemester, fetchSemesterByCourse } from "../controllers/semester.controller.js";



const router = express.Router();

router.get("/", fetchSemesterByCourse)
router.post("/", createSemester)


export default router;
