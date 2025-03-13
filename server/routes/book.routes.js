import express from "express";

import { addBook, fetchBooks, borrowBook, downloadExcel } from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", addBook)
router.get("/", fetchBooks)
router.post("/borrow/:bookId", borrowBook)
router.get("/download-excel", downloadExcel)

export default router;
