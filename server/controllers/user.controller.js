import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import path from "path";
import fs from "fs";
import s3 from "../config/s3.config.js";
import { fileURLToPath } from "url";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
import { Console } from "console";
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
  const { limit = 5, page = 1, sort = "", search = "" } = req.query;
  try {
    const elementsToSkip = (page - 1) * limit;

    const students = await User.aggregate([
      {
        $lookup: {
          from: "roles", 
          localField: "role", 
          foreignField: "_id", 
          as: "role", 
        },
      },
      {
        $match: {
          "role.name": "student",
        },
      },
      {
        $lookup: {
          from: "profiles",// mongo db convert "Profile" model name into"profiles"
          localField: "profile", 
          foreignField: "_id", 
          as: "profile", 
        },
      },
      {
        $unwind: {
          //mongoDb convert profile object to array, so in order to convert back to obj, we use unwind
          path: "$profile", 
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $match: {
          $or: [
            { "profile.first_name": { $regex: search, $options: "i" } },
            { "profile.last_name": { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          createdAt: sort === "desc" ? -1 : 1,
        },
      },
      {
        $skip: elementsToSkip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          email: 1,
          role: { _id: 1, name: 1 },
          profile: { first_name: 1, last_name: 1, mobile_number: 1 },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    const totalElements = await User.countDocuments();
    const totalPages = Math.ceil(totalElements / limit);
    const itemsInPage = students.length
    if (itemsInPage > 0) {
      return res
        .status(200)
        .json({ students, totalElements, page, limit, totalPages, itemsInPage });
    }
    return res.status(200).json({
      message: "No student data found",
      students: [],
      totalElements,
      page,
      limit,
      totalPages,
      itemsInPage
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
