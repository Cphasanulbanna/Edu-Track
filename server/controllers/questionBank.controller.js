import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.config.js";
import QuestionBank from "../models/questionBank.model.js";
import { v4 as uuidv4 } from "uuid";
import File from "../models/file.model.js";
import mongoose from "mongoose";

export const uploadQuestionBank = async (req, res) => {
  const { semester, title, course } = req.body;
  const document = req.file;
  try {
    if (!document) {
      return res
        .status(400)
        .json({ message: "Question document/file is required" });
    }

    if (
      !(
        document.mimetype === "application/pdf" ||
        document.mimetype.startsWith("image/")
      )
    ) {
      return res
        .status(400)
        .json({ message: "Only PDF and Images are allowed" });
    }
    if (!semester || !title || !course) {
      return res.status(400).json({
        message: "Semester, Question title and course ID is required",
      });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../uploads", document.filename);
    const fileContent = await fs.readFile(filePath);

    const fileUuid = uuidv4();
    const fileExtension = path.extname(document.originalname);
    const s3Folder = "question-bank";
    const s3ey = `${s3Folder}/${fileUuid}${fileExtension}`;

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3ey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3ey,
      Body: fileContent,
      ContentType: document.mimetype,
      ACL: "public-read",
    };

    const question = await QuestionBank.findOne({
      title,
      semester,
      course,
    });
    if (question) {
      return res.status(400).json({ message: "Question already exists" });
    }

    await s3.send(new PutObjectCommand(uploadParams));
    await fs.unlink(filePath);

    const newFile = new File({
      uuid: fileUuid,
      s3Folder: s3Folder,
      fileName: document.originalname,
      fileExtension: document.mimetype,
    });
    await newFile.save();

    const newQuestion = new QuestionBank({
      title,
      semester,
      course,
      uuid: fileUuid,
    });
    await newQuestion.save();

    return res
      .status(201)
      .json({ message: "New question bank created", id: fileUuid });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchAllQuestions = async (req, res) => {
  const { semester, courseId } = req.query;
  try {
    const aggregationQuery = [
      {
        $match: {},
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $project: {
          course: {name:"$course.title", _id: 1},
          title: 1,
          semester: 1,
          uuid: 1,
        },
      },
    ];
    if (semester) {
      aggregationQuery.push({ $match: { semester } });
    }
    if (courseId) {
      aggregationQuery.push({
        $match: { "course._id":  mongoose.Types.ObjectId.createFromHexString(courseId) },
      });
    }
    const questions = await QuestionBank.aggregate(aggregationQuery);

    if (!questions.length) {
      return res.status(404).json({ message: "Questions not found" });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
