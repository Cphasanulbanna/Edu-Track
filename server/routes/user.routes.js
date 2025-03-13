import express from "express";

import { fetchUsers, updateProfile, fetchStudents } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["admin","student"]), fetchUsers);
router.post("/update-profile", upload.single("image"), updateProfile)
router.get("/students", fetchStudents)

export default router;
