import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Book from "../models/Book.js"

import AppError from "../errors/AppError.js"

import { jwtDecode } from "jwt-decode"
 
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

export async function updateUserService(userId, data) {
    const user = await User.findById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const updateData = { ...data }

    if (data.newPassword !== undefined) {

        const isCurrentPasswordCorrect = await bcrypt.compare(
            data.currentPassword,
            user.password
        )

        if (!isCurrentPasswordCorrect) {
            throw new AppError(
                "Current password is incorrect",
                400,
                {
                    currentPassword: "Current password is incorrect"
                }
            )
        }

        updateData.password = await bcrypt.hash(
            data.newPassword,
            10
        )

        delete updateData.currentPassword
        delete updateData.newPassword
        delete updateData.confirmNewPassword
    }

    return User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true
        }
    )
}

export async function deleteUserService(userId) {
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
        throw new AppError("User not found", 400)
    }

    await Book.deleteMany({ userId: userId })

    return user
}