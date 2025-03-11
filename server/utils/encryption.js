import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const hashPassword = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export const validatePassword = async (password, hash) => {
   return await bcrypt.compare(password, hash)
}

export const generateAccessToken = (userId, roles) => {
    return jwt.sign({userId, roles}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_LIFE})
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_LIFE})
}

export const validateRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
}