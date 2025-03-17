import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
