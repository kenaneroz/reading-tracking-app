import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Book from "../models/Book.js"
import { Token } from "../models/Token.js"

import AppError from "../errors/AppError.js"

import { jwtDecode } from "jwt-decode"
import crypto from "crypto"
import { resend } from "../config/mailer.js"

import dotenv from "dotenv"
dotenv.config()

import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"

 
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
            {
                email: "This email address is already in use"
            }
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

    return newUser
}

export async function loginService(data) {
    const {
        email,
        password 
    } = data

    const user = await User.findOne({ email })
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

    return user
}

export async function updateUserService(userId, data, file) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const updateData = { ...data }

    if (file) {
        await deleteFromCloudinary("profile-photos", user.profilePhoto)

        const uploadResult = await uploadToCloudinary(file.buffer, "profile-photos")
        updateData.profilePhoto = uploadResult.secure_url
    }

    if (data.newPassword !== undefined) {
        const isCurrentPasswordCorrect = await bcrypt.compare(
            data.currentPassword,
            user.password
        )

        if (!isCurrentPasswordCorrect) {
            throw new AppError(
                "Current password is incorrect",
                400,
                { currentPassword: "Current password is incorrect" }
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
            "Invalid or expired link", 
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
            "Invalid or expired link", 
            400,
            {
                link: "Invalid or expired link"
            }
        )    
    }

    await Token.deleteOne({ _id: token._id })

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    return User.findByIdAndUpdate(
        t.userId,
        { password: hashedPassword }
    )
}