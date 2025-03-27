import express from "express";
import {
  createRoles,
  login,
  signup,
  refreshAccessToken,
  logout,
  resetPassword,
  resetPasswordMail,
  fetchAllRoles
} from "../controllers/auth.controller.js";
import passport from "../middleware/googleOauth.middleware.js";

const router = express.Router();

router.post("/role", createRoles);
router.get("/role", fetchAllRoles);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-access-token", refreshAccessToken);

router.post("/reset-password-mail", resetPasswordMail)
router.post("/reset-password", resetPassword)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/auth/google/callback",
    failureRedirect: "/google/failure",
  })
);

export default router;
