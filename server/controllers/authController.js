import jwt from "jsonwebtoken"

import {
    getUserService,
    registerService,
    loginService,
    updateUserService,
    deleteUserService
} from "../services/authService.js"
import AppError from "../errors/AppError.js"


function generateToken(userId) {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { 
        expiresIn: "30m" 
    })
}

export async function getUser(req, res) {
    const user = await getUserService(req.userId)

    res.json({
        success: true,
        message: "User fetching successful",
        data: user
    })
}

export async function register(req, res) {
    const newUser = await registerService(req.body)

    const token = generateToken(newUser._id)

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
            user: {
                _id: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email                
            },
            token
        }
    })
}

export async function login(req, res) {
    const user = await loginService(req.body)

    const token = generateToken(user._id)

    res.status(200).json({
        success: true,
        message: "Log in successful",
        data: {
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email                
            },
            token
        }        
    })
}

export async function updateUser(req, res) {
    const user = await updateUserService(
        req.userId,
        req.body
    )

    res.status(200).json({
        success: true,
        message: "Account information updated successfully",
        data: {
            user: {
                _id: user._id,
                profilePhoto: user.profilePhoto,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        }
    })
}

export async function deleteUser(req, res) {
    const user = await deleteUserService(req.userId)

    res.status(200).json({
        success: true,
        message: "Account deleted successfully",
        data: user
    })
}