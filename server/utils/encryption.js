import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (userId, roles) => {
  return jwt.sign({ userId, roles }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
};

export const validateRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

export const generateResetPasswordToken = (email) => {
  return jwt.sign({ email }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: process.env.RESET_PASSWORD_EXPIRY,
  });
};

export const validateResetPasswordToken = (token) => {
    return jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)
}


export const getUserIdFromRequest = (req) => {
  const token = req.headers.authorization.split(" ")?.[1];
  const decoded = jwt.decode(token);
  return decoded.userId
}

