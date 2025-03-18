import express from "express";
import { downloadFile } from "../controllers/file.controller.js";


const router = express.Router();

router.get("/:id", downloadFile)


export default router;
