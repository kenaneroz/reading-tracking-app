import bcrypt from "bcryptjs"
import User from "../models/User.js"

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
        throw new AppError("This email address is already in use", 400)
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
        throw new AppError("Invalid email or password", 400)
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError("Invalid email or password", 400)
    }

    return user
}