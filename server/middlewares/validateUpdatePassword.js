import { validatePasswordStrength } from "../utils/validatePasswordStrength.js"

export default function validateUpdatePassword(req, res, next) {
    const allowedFields = [
        "currentPassword", 
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
        currentPassword, 
        newPassword, 
        confirmNewPassword 
    } = req.body

    if (typeof currentPassword !== "string" || currentPassword === "") {
        errors.currentPassword = "Current password is required"
    }

    const newPasswordError = validatePasswordStrength(newPassword)
    if (newPasswordError) errors.newPassword = newPasswordError

    if (typeof confirmNewPassword !== "string" || confirmNewPassword === "") {
        errors.confirmNewPassword = "Password confirmation is required"
    } else if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = "Passwords do not match"
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