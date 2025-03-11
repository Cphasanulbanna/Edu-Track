import express from "express";

import { fetchUsers } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware(["admin"]), fetchUsers);

export default router;
