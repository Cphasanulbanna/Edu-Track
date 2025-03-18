import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true }, 
    s3Folder: { type: String, required: true }, 
    fileName: { type: String, required: true },
    fileExtension: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
