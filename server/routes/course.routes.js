import express from "express";

import { fetchCourses, createCourses, enrollCourse, deleteCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", fetchCourses)
router.post("/", createCourses)
router.delete("/:id", deleteCourse)
router.post("/enroll", enrollCourse)

export default router;
