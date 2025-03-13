import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import path from "path";
import fs from "fs";
import s3 from "../config/s3.config.js";
import { fileURLToPath } from "url";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
dotenv.config();

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-__v -password")
      .populate("role", "-__v")
      .populate("profile", "-__v");
    if (!users) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileContent = fs.readFileSync(
      path.join(__dirname, "../uploads", req.file.filename)
    );

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
      Key: `avatar/${req.file.filename}`, // Same file name as the previous upload
    };

    // Delete the existing file from S3 if it exists
    await s3.send(new DeleteObjectCommand(deleteParams));

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
      Key: `avatar/${req.file.filename}`, // File name in the bucket
      Body: fileContent, // File content
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(uploadParams);

    // Upload the file to S3 using the send() method of the S3 client
    const data = await s3.send(command);
    console.log({ data });
    fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename));

    res.status(200).json({
      message: "File uploaded successfully",
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/avatar/${req.file.filename}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchStudents = async (req, res) => {
  try {
    const studentRole = await Role.findOne({ name: "student" });
    const students = await User.find({ role: studentRole.id }).select("-password -__v -googleId -updatedAt").populate("role", "-__v -_id").populate("profile", "-__v -_id")
    const totalElements = await User.countDocuments({role:studentRole.id})
    if (totalElements > 0) {
      return res.status(200).json({ students,totalElements });
    }
    return res.status(200).json({ message: "No student data found",students:[], totalElements });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
