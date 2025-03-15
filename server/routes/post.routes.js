import express from "express";
import { createPost, fetchPosts , fetchSinglePost, deletePost, likePost, commentPost} from "../controllers/post.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();
router.post("/:userId", upload.single("image"), createPost);
router.get("/", fetchPosts);
router.get("/:id", fetchSinglePost);
router.delete("/:id", deletePost);
router.post("/like-post/:id/:userId", likePost)
router.post("/comment-post/:id/:userId", commentPost)

export default router;
