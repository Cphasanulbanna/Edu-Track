import User from "../models/user.model.js";
import path from "path";
import fs from "fs/promises";
import s3 from "../config/s3.config.js";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import dotenv from "dotenv";
import Book from "../models/book.model.js";
import { getUserIdFromRequest } from "../utils/encryption.js";
dotenv.config();

export const fetchUsers = async (req, res) => {
  const { role, page = 1, limit = 7, search = "", batch = "" } = req.query;
  const elementsToSkip = (page - 1) * limit;
  const decodedBatch = decodeURIComponent(batch);

  try {
    const pipeline = [
      {
        $facet: {
          users: [
            // Unwind roles array
            {
              $unwind: "$role", // this is array of ObjectIds
            },

            // Lookup each role
            {
              $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "roleDetails",
              },
            },
            {
              $unwind: "$roleDetails",
            },

            // Optional filter by role name
            ...(role
              ? [
                  {
                    $match: {
                      "roleDetails.name": role,
                    },
                  },
                ]
              : []),

            {
              $lookup: {
                from: "batches",
                localField: "batch",
                foreignField: "_id",
                as: "batchDetails",
              },
            },
            {
              $unwind: {
                path: "$batchDetails",
                preserveNullAndEmptyArrays: true, // This is fine if you want to keep users without batches
              },
            },

            ...(decodedBatch
              ? [
                  {
                    $match: {
                      "batchDetails.title": decodedBatch, // Using decoded batch
                    },
                  },
                ]
              : []),

            // Group back user by _id and collect roles
            {
              $group: {
                _id: "$_id",
                email: { $first: "$email" },
                profile: { $first: "$profile" },
                batchDetails: { $first: "$batchDetails" },
                roles: { $push: "$roleDetails" },
              },
            },

            // Lookup profile
            {
              $lookup: {
                from: "profiles",
                localField: "profile",
                foreignField: "_id",
                as: "profile",
              },
            },
            {
              $unwind: "$profile",
            },

            {
              $match: {
                $or: [
                  { "profile.last_name": { $regex: search, $options: "i" } },
                  { "profile.last_name": { $regex: search, $options: "i" } },
                ],
              },
            },

            // Final Projection
            {
              $project: {
                email: 1,
                batch: {
                  title: "$batchDetails.title",
                },
                roles: {
                  $map: {
                    input: "$roles",
                    as: "role",
                    in: {
                      _id: "$$role._id",
                      name: "$$role.name",
                    },
                  },
                },
                profile: {
                  first_name: "$profile.first_name",
                  last_name: "$profile.last_name",
                  mobile_number: "$profile.mobile_number",
                  avatar: "$profile.avatar",
                },
              },
            },
            {
              $skip: elementsToSkip,
            },
            {
              $limit: limit,
            },
            {
              $sort: { email: 1 },
            },
          ],
          totalUsers: [
            { $unwind: "$role" },
            {
              $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "roleDetails",
              },
            },
            { $unwind: "$roleDetails" },
            ...(role
              ? [
                  {
                    $match: {
                      "roleDetails.name": role,
                    },
                  },
                ]
              : []),

            ...(decodedBatch
              ? [
                  {
                    $match: {
                      "batchDetails.title": decodedBatch, // Using decoded batch
                    },
                  },
                ]
              : []),
            {
              $group: {
                _id: "$_id",
                profile: { $first: "$profile" },
              },
            },
            {
              $lookup: {
                from: "profiles",
                localField: "profile",
                foreignField: "_id",
                as: "profile",
              },
            },
            { $unwind: "$profile" },
            {
              $match: {
                $or: [
                  { "profile.first_name": { $regex: search, $options: "i" } },
                  { "profile.last_name": { $regex: search, $options: "i" } },
                ],
              },
            },
            { $count: "count" },
          ],
        },
      },
    ];

    const [results] = await User.aggregate(pipeline);
    if (!results) {
      return res.status(404).json({ message: "No data found" });
    }
    const { users, totalUsers } = results;

    const totalPages = Math.ceil(totalUsers?.[0]?.count / limit);

    return res.status(200).json({
      users: users,
      totalUsers: totalUsers?.[0]?.count,
      totalPages,
      page,
      limit,
      itemsInPage: users?.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const avatar = req.file;
    const { first_name, last_name, dob, mobile_number } = req.body;

    // if (!avatar) {
    //   return res.status(400).send("No file uploaded");
    // }

    const userId = getUserIdFromRequest(req);

    const user = await User.findById(userId).populate("profile");

    if (!user) {
      return res.status(404).send("User not Found");
    }

    if (avatar) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, "../uploads", avatar.filename);
      const fileContent = await fs.readFile(filePath);

      const fileUuid = uuidv4();
      const fileExtension = path.extname(avatar.originalname);
      const s3Folder = "avatar";
      const s3key = `${s3Folder}/${fileUuid}${fileExtension}`;

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3key,
      };

      await s3.send(new DeleteObjectCommand(deleteParams));

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3key,
        Body: fileContent,
        ContentType: avatar.mimetype,
        ACL: "public-read",
      };

      await s3.send(new PutObjectCommand(uploadParams));
      await fs.unlink(filePath);
      const avatarUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3key}`;
      user.profile.avatar = avatarUrl;
    }

    if (mobile_number) {
      user.profile.mobile_number = mobile_number
    }
    if (dob) {
      user.profile.dob = dob
    }
    if (first_name) {
      user.profile.first_name = first_name
    }
    if (last_name) {
      user.profile.last_name = last_name
    }

    await user.profile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      url: avatarUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchStudents = async (req, res) => {
  const { limit = 5, page = 1, sort = "", search = "", batch = "" } = req.query;

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
          from: "batches",
          localField: "batch",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $unwind: {
          path: "$batch",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "profiles", // mongo db convert "Profile" model name into"profiles"
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
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: {
          path: "$course",
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
        $match: {
          "batch.title": { $regex: batch, $options: "i" },
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
          batch: { _id: 1, title: 1 },
          createdAt: 1,
          updatedAt: 1,
          course: { title: 1 },
        },
      },
    ]);

    const totalElements = await User.countDocuments();
    const totalPages = Math.ceil(totalElements / limit);
    const itemsInPage = students.length;
    if (itemsInPage > 0) {
      return res.status(200).json({
        students,
        totalElements,
        page,
        limit,
        totalPages,
        itemsInPage,
      });
    }
    return res.status(200).json({
      message: "No student data found",
      students: [],
      totalElements,
      page,
      limit,
      totalPages,
      itemsInPage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchBorrowedBooks = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const books = await Book.find({ borrower: userId }).select(
      "-__v -borrower -updatedAt -createdAt"
    );
    if (!books.length) {
      return res.status(404).json({ message: "No borrowed books found" });
    }
    return res.status(404).json({ books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const fetchProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const user = await User.findById(userId)
      .populate({ path: "role", select: "name" })
      .populate({ path: "course", select: "title" })
      .populate({ path: "department", select: "name" })
      .populate({
        path: "profile",
        select: "first_name last_name dob mobile_number avatar",
      });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    const userDetails = {
      email: user?.email,
      role: user?.role?.map((item) => item?.name),
      first_name: user?.profile?.first_name,
      last_name: user?.profile?.last_name,
      dob: user?.profile?.dob,
      mobile_number: user?.profile?.mobile_number,
      avatar: user?.profile?.avatar,
      course: user?.course?.title,
      department: user?.department?.name,
    };
    return res.status(200).json({ data: userDetails });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
