import express from "express";

import { fetchCourses, createCourses, enrollCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", fetchCourses)
router.post("/", createCourses)
router.post("/enroll", enrollCourse)

export default router;
