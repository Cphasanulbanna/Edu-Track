import express from "express";

import { fetchUsers, updateProfile, fetchStudents, fetchBorrowedBooks, fetchProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["admin","student", "teacher"]), fetchUsers);
router.post("/update-profile", upload.single("image"), updateProfile)
router.get("/students", fetchStudents)
router.get("/books/:userId", fetchBorrowedBooks)
router.get("/profile/:userId", fetchProfile)

export default router;
