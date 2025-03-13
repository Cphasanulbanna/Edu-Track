import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    author: {
      type: String,
    },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
    returned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", userSchema);

export default Book;
