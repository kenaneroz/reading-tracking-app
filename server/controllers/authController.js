import jwt from "jsonwebtoken"

import {
    getUserService,
    registerService,
    loginService,
    updatePpService,
    updateUserService,
    requestDeleteAccountService,
    confirmDeleteAccountService,
    forgotPasswordService,
    resetPasswordService
} from "../services/authService.js"

function generateToken(userId) {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { 
        expiresIn: "1h" 
    })
}

export async function getUser(req, res) {
    const user = await getUserService(req.userId)

    res.status(200).json({
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

export async function updatePp(req, res) {
    const user = await updatePpService(
        req.userId,
        req.file 
    )
    
    res.status(200).json({
        success: true,
        message: "Profile photo updated successfully",
        data: user
    })
}
export async function updateUser(req, res) {
    const user = await updateUserService(
        req.userId,
        req.body,
    )
    
    res.status(200).json({
        success: true,
        message: "Account information updated successfully",
        data: user
    })
}

export async function requestDeleteAccount(req, res) {
    await requestDeleteAccountService(req.userId)

    res.status(200).json({
        success: true,
        message: "We've sent a confirmation link to your email. Click it to permanently delete your account.",        
        data: []
    })
}

export async function confirmDeleteAccount(req, res) {
    const { token } = req.query
    const userId = req.userId
    await confirmDeleteAccountService(userId, token)

    res.status(200).json({
        success: true,
        message: "Your account have been permanently deleted. We're sorry to hear that.",
        data: []
    })
}

export async function forgotPassword(req, res) {
    await forgotPasswordService(req.body.email)

    res.status(200).json({
        success: true,
        message: "If this email is exist, a reset link was sent to the provided email",
        data: []
    })
}

export async function resetPassword(req, res) {
    const { token } = req.query
    const data = req.body

    await resetPasswordService(token, data)

    res.status(200).json({
        success: true,
        message: "Password updated successfully",
        data: []
    })
}