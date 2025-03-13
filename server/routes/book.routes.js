import express from "express";

import { addBook, fetchBooks, borrowBook } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", addBook)
router.get("/", fetchBooks)
router.post("/borrow/:bookId", borrowBook)

export default router;
