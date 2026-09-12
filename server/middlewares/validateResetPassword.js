import AppError from "../errors/AppError.js"
import { validatePasswordStrength } from "../utils/validatePasswordStrength.js"
import { ERRORS, PASSWORD_ERRORS, AUTH_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateResetPassword(req, res, next) {
    const allowedFields = [
        "newPassword", 
        "confirmNewPassword"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError(ERRORS.NO_FIELDS, 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError(ERRORS.INVALID_FIELDS, 400)
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
        errors.newPassword = PASSWORD_ERRORS.NEW_REQUIRED
    }

    if (
        confirmNewPassword === undefined ||
        typeof(confirmNewPassword) !== "string" ||
        confirmNewPassword.trim() === ""
    ) {
        errors.confirmNewPassword = PASSWORD_ERRORS.CONFIRM_REQUIRED
    } else if (confirmNewPassword !== newPassword) {
        errors.confirmNewPassword = AUTH_ERRORS.PASSWORDS_NO_MATCH
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