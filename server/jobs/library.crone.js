import cron from "node-cron";
import Book from "../models/book.model.js";
import { sendMail } from "../utils/sendMail.js";

cron.schedule("* * * * *", async () => {
  const users = await Book.aggregate([
    {
      $match: {
        borrowed: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "borrower",
        foreignField: "_id",
        as: "user_details",
      },
      },
    {
      $unwind: "$user_details",
    //   preserveNullAndEmptyArrays: true,
      },
        {
      $lookup: {
        from: "profiles",            // Lookup the 'profiles' collection
        localField: "user_details.profile", // Match the 'profile' field from User model (ObjectId reference)
        foreignField: "_id",         // Match it with '_id' field in Profile model
        as: "profile_details",       // Alias for the profile data
      },
    },
    {
      $unwind: {
        path: "$profile_details",   // Unwind the profile details to get individual fields
        // preserveNullAndEmptyArrays: true, // If no profile, keep the result empty
      },
    },
    {
      $project: {
            "profile_details.first_name": 1,  // Now project first_name from profile_details
        "profile_details.last_name": 1,
        "user_details.email": 1,
      },
    },
  ]);

  for (const user of users) {
    const name = `${user.profile_details.first_name} ${user.profile_details.last_name}`;
    console.log({ user });
    if (user.user_details.email) {
      await sendMail(
        name,
        user.user_details.email,
        "book borrow reminder",
        null,
        "book-reminder.html"
      );
    }
  }
});
