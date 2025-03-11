import express from "express";
import { createRoles, login, signup , refreshAccessToken, logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/role", createRoles);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-access-token", refreshAccessToken);

export default router;
