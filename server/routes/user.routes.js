import express from "express";

import { fetchUsers, updateProfile, fetchStudents, fetchBorrowedBooks } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["admin","student"]), fetchUsers);
router.post("/update-profile", upload.single("image"), updateProfile)
router.get("/students", fetchStudents)
router.get("/books/:userId", fetchBorrowedBooks)

export default router;
