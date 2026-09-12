import AppError from "../errors/AppError.js"
import { ERRORS, EMAIL_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateForgotPassword(req, res, next) {
    const allowedFields = [ "email" ]

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

    const { email } = req.body

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email !== undefined) {
        if (typeof email !== "string" || email.trim() === "") {
            errors.email = EMAIL_ERRORS.REQUIRED

        } else if (email.length > 254) {
            errors.email = EMAIL_ERRORS.TOO_LONG

        } else if (!emailRegex.test(email.trim())) {
            errors.email = EMAIL_ERRORS.INVALID
        }
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