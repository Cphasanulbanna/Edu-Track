import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/encryption.js";
import Role from "../models/role.model.js";
dotenv.config();

passport.serializeUser((user, done) => {
  // console.log({ user });
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {

      try {
        let user = await User.findOne({ email: profile?._json?.email });
        const role = await Role.findOne({ name: "student" });
        const roleNames = user?.role?.map((obj) => obj?.name) ?? ["student"];

        if (user) {
          const accessToken = generateAccessToken(user._id, roleNames);
          const refreshToken = generateRefreshToken(user._id);

          await user.populate("role", "-__v");
          await user.populate("profile", "-__v");
          request.res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            secure: false, //true in prod
          });
          request.res.cookie("access-token", accessToken, {
            httpOnly: false,
            secure: false, //true in prod
          });
          if (!user.password) {
            return done(null, {
              user,
              accessToken,
              refreshToken,
              message: "Set new password",
              redirectToPasswordPage: true,
            });
          }

          return done(null, { user, accessToken, refreshToken });
        } else {
          console.log("block 2");
          // Start by creating the user
          user = new User({
            email: profile?._json?.email,
            googleId: profile?._json?.sub,
            password: null, // No password required at first
            role: role?._id, // Assign role
          });

          // Save user and handle potential errors
          const savedUser = await user.save();

          // Step 4: Create the user profile only after saving the user
          const newProfile = new Profile({
            first_name: profile?.displayName,
            avatar: profile?._json?.picture,
          });

          // Save the profile and associate it with the user
          const savedProfile = await newProfile.save();

          // Now associate the profile with the user
          savedUser.profile = savedProfile._id;
          await savedUser.save(); // Re-save user with the profile reference

          // Populate the user with the role and profile data
          await savedUser.populate("role", "-__v");
          await savedUser.populate("profile", "-__v");

          // Step 5: Generate access/refresh tokens for the user
          const roleNames = savedUser?.role?.map((obj) => obj?.name) ?? [
            "student",
          ];
          const accessToken = generateAccessToken(savedUser._id, roleNames);
          const refreshToken = generateRefreshToken(savedUser._id);

          console.log({ accessToken, refreshToken });
          request.res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            secure: false, //true in prod
          });
          request.res.cookie("access-token", accessToken, {
            httpOnly: true,
            secure: false, //true in prod
          });

          return done(null, { user: savedUser, accessToken, refreshToken });
        }
      } catch (error) {
        console.log("block 1", error);
        return done(error);
      }
    }
  )
);

export default passport;
