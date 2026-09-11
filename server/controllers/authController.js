import AppError from "../errors/AppError.js"
import User from "../models/User.js"
import {
    getUserService,
    registerService,
    loginService,
    googleAuthService,
    updatePpService,
    updateUserService,
    requestDeleteAccountService,
    confirmDeleteAccountService,
    forgotPasswordService,
    resetPasswordService,
    logoutService,
    generateNewAccessTokenService,
} from "../services/authService.js"

const secure = process.env.NODE_ENV === "production"
const sameSite = secure ? "none" : "lax"

export async function getUser(req, res) {
    const user = await getUserService(req.userId)

    res.status(200).json({
        success: true,
        message: "User fetching successful",
        data: user
    })
}

export async function register(req, res) {
    const {
        accessToken,
        refreshToken,
        newUser
    } = await registerService(req.body)

    res.cookie(
        "refreshToken",
        refreshToken,
        {
            maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )
    res.cookie(
        "accessToken",
        accessToken,
        {
            maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )
    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: newUser
    })
}

export async function login(req, res) {
    const {
        accessToken,
        refreshToken,
        user
    } = await loginService(req.body)

    res.cookie(
        "refreshToken",
        refreshToken,
        {
            maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )
    res.cookie(
        "accessToken",
        accessToken,
        {
            maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: user
    })
}

export async function googleAuth(req, res) {
    const { access_token } = req.body

    if (!access_token) {
        throw new AppError("Invalid Google authorization", 400)
    }

    const {
        refreshToken,
        accessToken,
        user
    } = await googleAuthService(access_token)

    res.cookie(
        "refreshToken",
        refreshToken,
        {
            maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )
    res.cookie(
        "accessToken",
        accessToken,
        {
            maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )

    res.status(200).json({
        success: true,
        message: "Google auth successful",
        data: user
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

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken

    await logoutService(refreshToken)

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure,
        sameSite
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure,
        sameSite
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
        data: []
    })
}

export async function generateNewAccessToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    const newAccessToken = await generateNewAccessTokenService(refreshToken)

    res.cookie(
        "accessToken",
        newAccessToken,
        {
            maxAge: Number(process.env.JWT_ACCESS_EXPIRES_IN_MS),
            httpOnly: true,
            secure,
            sameSite
        }
    )

    res.status(201).json({
        success: true,
        message: "Access token refreshed successfully",
        data: []
    })
}