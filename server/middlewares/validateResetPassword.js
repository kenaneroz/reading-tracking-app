import AppError from "../errors/AppError.js"
import { validatePasswordStrength } from "../utils/validatePasswordStrength.js"

export default function validateResetPassword(req, res, next) {
    const allowedFields = [
        "newPassword", 
        "confirmNewPassword"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    const errors = {}
    const { 
        newPassword, 
        confirmNewPassword 
    } = req.body

    if (newPassword !== undefined) {
        const newPasswordError = validatePasswordStrength(newPassword)
        if (newPasswordError) errors.newPassword = newPasswordError
    } else {
        errors.newPassword = "New password is required"
    }

    if (
        confirmNewPassword === undefined ||
        typeof(confirmNewPassword) !== "string" ||
        confirmNewPassword.trim() === ""
    ) {
        errors.confirmNewPassword = "Confirm new password is required"
    } else if (confirmNewPassword !== newPassword) {
        errors.confirmNewPassword = "Passwords don't match"
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        })
    }

    next()
}