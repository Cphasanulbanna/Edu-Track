import express from "express";

import { fetchCourses, createCourses, enrollCourse, deleteCourse, fetchCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", fetchCourses)
router.get("/:id", fetchCourse)
router.post("/", createCourses)
router.delete("/:id", deleteCourse)
router.post("/enroll", enrollCourse)

export default router;
