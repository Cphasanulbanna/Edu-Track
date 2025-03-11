import Profile from "../models/profile.model.js";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  validatePassword,
  validateRefreshToken,
} from "../utils/encryption.js";

export const createRoles = async (req, res) => {
  const { name } = req.body;
  try {
    const isRoleExists = await Role.findOne({ name });
    if (isRoleExists) {
      return res
        .status(400)
        .json({ message: `Role: "${name}" already exists` });
    }

    const newRole = new Role({ name });
    await newRole.save();

    res.status(201).json({ message: "new role created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    role = "student",
  } = req.body;
  try {
    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile_number ||
      !password ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: `User already exists with ${email}` });
    }

    const hashedPassword = await hashPassword(password);

    const newProfile = new Profile({
      first_name,
      last_name,
      mobile_number,
    });
    await newProfile.save();

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      profile: newProfile._id,
    });
    await newUser.save();
    await newUser.populate("role", "-__v");
    await newUser.populate("profile", "-__v");

    const roleNames = newUser.role?.map((obj) => obj?.name);

    const accessToken = generateAccessToken(newUser?._id, roleNames);
    const refreshToken = generateRefreshToken(newUser?._id);

    const userData = {
      _id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      profile: {
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
        mobile_number: newProfile.mobile_number,
      },
    };

    res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: true });

    return res.status(201).json({
      message: "Account created",
      accessToken,
      userData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.populate("role", "-__v");

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const roleNames = user?.role?.map((obj) => obj?.name);

    const accessToken = generateAccessToken(user._id, roleNames);
    const refreshToken = generateRefreshToken(user._id);

    const profile = await Profile.findById(user.profile);

    const userData = {
      _id: user._id,
      email: user.email,
      role: user.role,
      first_name: profile.first_name,
      last_name: profile.last_name,
      mobile_number: profile.mobile_number,
    };

    res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: true });

    return res.status(200).json({ accessToken, userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.["refresh-token"];
  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token found" });
  }
  try {
    const decoded = validateRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }

    const roles = await Role.findById(decoded?.sub);
    let roleNames = [];
    if (roles) {
      roleNames = roles?.map((obj) => obj?.name);
    }

    const newAccessToken = generateAccessToken(decoded?.sub, roleNames);
    const newRefreshTokenToken = generateRefreshToken(decoded?.sub);

    res.cookie("refresh-token", newRefreshTokenToken, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refresh-token");
  return res.status(200).json({ message: "Logged out successfully" });
};
