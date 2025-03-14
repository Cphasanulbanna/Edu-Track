import Post from "../models/post.model.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.config.js";
dotenv.config();

export const createPost = async (req, res) => {
  const image = req.file;
  console.log({ req });

  const { title, description } = req.body;
  const { userId } = req.params;
  try {
    if (!userId || !title) {
      return res
        .status(400)
        .json({ message: "Post title and Author Id is required" });
    }
    let s3ImageURL;

    if (image) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, "../uploads", image.filename);
      const fileContent = await fs.readFile(filePath);

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `posts/${image.filename}`,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `posts/${image.filename}`,
        Body: fileContent,
        ContentType: image.mimetype,
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));
      await fs.unlink(filePath);
      s3ImageURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/posts/${req.file.filename}`;
    }

    const postData = {
      title,
      description,
      user: userId,
      image: s3ImageURL,
    };

    const newPost = new Post(postData);
    await newPost.save();
    return res.status(201).json({ message: "Post created", newPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Post Id is required" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Post Id is required" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    const fileName = post?.image?.split("/")?.at(-1);

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `posts/${fileName}`,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: `Post deleted with id of ${id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
