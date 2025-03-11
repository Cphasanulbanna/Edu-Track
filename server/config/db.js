import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1); // 1= failure, 0= success
  }
};
