import express from "express";

import { fetchCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", fetchCourses)

export default router;
