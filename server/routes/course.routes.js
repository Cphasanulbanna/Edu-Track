import express from "express";

import { fetchCourses, createCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", fetchCourses)
router.post("/", createCourses)

export default router;
