import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.config.js";

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
      document.mimetype !== "application/pdf" ||
      !document.mimetype.startsWith("image/")
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

    let questionBankUrl;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../uploads", document.filename);
    const fileContent = await fs.readFile(filePath);

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `question-bank/${document.filename}`,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `posts/${document.filename}`,
      Body: fileContent,
      ContentType: document.mimetype,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(uploadParams));
    await fs.unlink(filePath);
    questionBankUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/question-bank/${document.filename}`;

    return res
      .status(201)
      .json({ message: "New question bank created", questionBankUrl });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
