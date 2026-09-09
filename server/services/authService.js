import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Book from "../models/Book.js"
import { Token } from "../models/Token.js"

import AppError from "../errors/AppError.js"

import crypto from "crypto"
import { resend } from "../config/mailer.js"

import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken"

import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"
import deleteMultipleFromCloudinary from "../utils/deleteMultipleFromCloudinary.js"
import getPublicIdFromCloudinaryUrl from "../utils/getPublicIdFromCloudinaryUrl.js"
 
function generateRefreshToken(userId) {
    return jwt.sign(
        { userId: userId }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    )
}

function generateAccessToken(userId) {
    return jwt.sign(
        { userId: userId }, 
        process.env.JWT_ACCESS_SECRET, 
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    )
}

export async function getUserService(userId) {
    const user = await User.findById(userId).select("-password")

    if (!user) {
        throw new AppError("User not found", 400)
    }

    return user
}

export async function registerService(data) {
    const {
        name,
        surname,
        email, 
        password,
    } = data

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new AppError(
            "Validation failed", 
            400, 
            { email: "This email address is already in use" }
        )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        surname,
        email,
        password: hashedPassword
    })

    const refreshToken = generateRefreshToken(newUser._id)
    const accessToken = generateAccessToken(newUser._id)

    await Token.create({
        userId: newUser._id,
        type: "refresh-token",
        token: refreshToken,
        expiresAt: Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN_MS)
    })

    return {
        refreshToken,
        accessToken, 
        newUser
    }
}

export async function googleLoginService(token) {
    const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo", 
        { headers: { Authorization: `Bearer ${token}` } }
    )

    const result = await response.json()

    if (!response.ok) {
        throw new AppError(
            "Invalid Google authorization", 
            400
        )
    }

    const { 
        given_name, 
        family_name, 
        email 
    } = result

    let user = await User.findOne({ email })

    if (!user) {
        user = await User.create(
            {
                name: given_name || "Name",
                surname: family_name || "Surname",
                email: email,
                password: Math.random().toString(36).slice(-10) + "Google1!"
            }
        )
    }

    const refreshToken = generateRefreshToken(user._id)
    const accessToken = generateAccessToken(user._id)

    return {
        refreshToken,
        accessToken,
        user
    }
}

export async function loginService(data) {
    const {
        email,
        password 
    } = data

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new AppError(
            "Validation failed", 
            400, 
            {
                email: "Invalid email or password",
                password: "Invalid email or password"
            }
        )
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError(
            "Validation failed", 
            400, 
            {
                email: "Invalid email or password",
                password: "Invalid email or password"
            }
        )
    }

    const refreshToken = generateRefreshToken(user._id)
    const accessToken = generateAccessToken(user._id)

    await Token.create({
        userId: user._id,
        type: "refresh-token",
        token: refreshToken,
        expiresAt: Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN_MS)
    })

    return {
        refreshToken,
        accessToken,
        user
    }
}

export async function updatePpService(userId, file) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    if (file) {
        const uploadResult = await uploadToCloudinary(file.buffer, "profile-photos")

        if (user.profilePhoto) {
            try {
                await deleteFromCloudinary("profile-photos", user.profilePhoto)
            } catch (error) {
                console.error("Old profile photo deletion failed:", error)
            }
        }

        user.profilePhoto = uploadResult.secure_url
        await user.save()
    }

    user.password = undefined
    return user
}

export async function updateUserService(userId, data) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const updateData = { ...data }

    if (updateData.email === user.email) {
        throw new AppError(
            "Validation failed",
            400,
            { email: "This is already your current email address" }
        )
    }

    if (updateData.newPassword !== undefined) {
        const isCurrentPasswordCorrect = await bcrypt.compare(
            updateData.currentPassword,
            user.password
        )

        if (!isCurrentPasswordCorrect) {
            throw new AppError(
                "Validation failed",
                400,
                { currentPassword: "Current password is incorrect" }
            )
        }

        
        if (updateData.currentPassword === updateData.newPassword) {
            throw new AppError(
                "Validation failed",
                400,
                { newPassword: "New password must be different from the current password" }
            )
        }

        updateData.password = await bcrypt.hash(data.newPassword, 10)

        delete updateData.currentPassword
        delete updateData.newPassword
        delete updateData.confirmNewPassword
    }

    return User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    )
}

export async function requestDeleteAccountService(userId) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 400)
    }

    await Token.deleteMany({ userId: user._id, type: "delete-account" })

    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex")

    await Token.create({
        userId: user._id,
        type: "delete-account",
        token: hashedToken,
        expiresAt: Date.now() + 900000
    })

    const link = `${process.env.CLIENT_URL}/confirm-delete-account?token=${rawToken}`

    await resend.emails.send({
      from: "noreply@reading-tracking-app.kenaneroz.com",
      to: user.email,
      subject: "Delete account – Reading Tracking App",
      html: `<p>To confirm deleting your account <a href="${link}">click here</a>. The link expires in 15 minutes.</p>`,
    })

    return true
}

export async function confirmDeleteAccountService(userId, token) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 400)
    }
 
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const t = await Token.findOne({ type: "delete-account", token: hashedToken })

    if (
        !t ||
        t.expiresAt < Date.now()
    ) {
        throw new AppError(
            "Invalid or expired token",
            400,
            {
                token: "Invalid or expired token"
            }
        )
    }

    // Delete all user's books and profile photo from Cloudinary
    const urls = []

    const books = await Book.find({ userId: userId }).select("cover")
    urls.push(
        ...books
            .map(book => book.cover)
            .filter(cover => cover && !cover.includes("default"))
    )

    if (user.profilePhoto && !user.profilePhoto.includes("default")) {
        urls.push(user.profilePhoto)
    }

    const publicIds = urls
        .map(url => getPublicIdFromCloudinaryUrl(url))
        .filter(Boolean)

    if (publicIds.length > 0) {
        await deleteMultipleFromCloudinary(publicIds)
    }

    // Delete user, books, and tokens from the database
    await User.findByIdAndDelete(userId)
    await Book.deleteMany({ userId: userId })
    await Token.deleteMany({ userId: userId })

    return true
}

export async function forgotPasswordService(email) {
    const user = await User.findOne( { email: email })

    if (!user) {
        return true
    }

    await Token.deleteMany({ userId: user._id, type: "reset-password" })

    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex")

    await Token.create({
        userId: user._id,
        type: "reset-password",
        token: hashedToken,
        expiresAt: Date.now() + 300000
    })

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`

    await resend.emails.send({
      from: "noreply@reading-tracking-app.kenaneroz.com",
      to: user.email,
      subject: "Reset password – Reading Tracking App",
      html: `<p>To reset your password <a href="${resetLink}">click here</a>. The link expires in 5 minutes.</p>`,
    })

    return true
}

export async function resetPasswordService(token, data) {
    if (!token) {
        throw new AppError(
            "Validation failed", 
            400,
            {
                link: "Invalid or expired link"
            }
        )
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const t = await Token.findOne( { type: "reset-password", token: hashedToken })

    if (!t || 
        t.expiresAt < Date.now()
    ) {
        throw new AppError(
            "Validation failed", 
            400,
            {
                link: "Invalid or expired link"
            }
        )    
    }

    const user = await User.findById(t.userId)

    if (!user) {
        throw new AppError("User not found", 400)
    }

    const isSame = await bcrypt.compare(
        data.newPassword,
        user.password
    )

    if (isSame) {
        throw new AppError(
            "Validation failed",
            400,
            { newPassword: "New password must be different from the current password" }
        )        
    }

    await Token.deleteOne({ _id: t._id })

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    user.password = hashedPassword
    return await user.save()
}

export async function logoutService(refreshToken) {
    if (refreshToken) {
        await Token.deleteOne({ token: refreshToken, type: "refresh-token" })
    }

    return true
}

export async function generateNewAccessTokenService(refreshToken) {
    if (!refreshToken) {
        throw new AppError("Unauthorized", 401)
    }

    let decoded
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (error) {
        throw new AppError("Invalid or expired refresh token", 401)
    }

    const storedToken = await Token.findOne({
        userId: decoded.userId,
        type: "refresh-token",
        token: refreshToken
    })

    if (!storedToken || storedToken.expiresAt < Date.now()) {
        throw new AppError("Invalid or expired refresh token", 401)
    }

    const newAccessToken = generateAccessToken(decoded.userId)

    return newAccessToken
}