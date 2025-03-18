import { GetObjectCommand } from "@aws-sdk/client-s3";
import File from "../models/file.model.js";
import s3 from "../config/s3.config.js";
import path from "path"

export const downloadFile = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "File is is required" });
    }
    const file = await File.findOne({ uuid: id });
    if (!file) {
      return res.status(400).json({ message: `File not found with ${id}` });
    }
    const fileKey = `${file.s3Folder}/${id}${path.extname(file.fileName)}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    res.setHeader("Content-Type", response.ContentType);
    res.setHeader("Content-Disposition", `inline; filename=${file.fileName}`);
    response.Body.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
