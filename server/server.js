import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import postRoutes from "./routes/post.routes.js";
import courseRoutes from "./routes/course.routes.js";

import { connectDb } from "./config/db.js";
import passport from "./middleware/googleOauth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // In development mode, set this to false
      httpOnly: true
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
  })
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/post", postRoutes);
app.use("/api/course", courseRoutes);

connectDb()
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
