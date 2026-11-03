import { ERRORS, AUTH_ERRORS } from "../../shared/constants/errorMessages.js"

export default function errorMiddleware(error, req, res, next) {
    let statusCode = 500
    let message = ERRORS.SERVER_ERROR

    if (error.isOperational) {
        statusCode = error.statusCode
        message = error.message

        if (!error.errors) error.errors = { general: error.message }
    } else if (error.name === "CastError") {
        statusCode = 400
        message = ERRORS.INVALID_ID
    } else if (error.name === "ValidationError") {
        statusCode = 400
        message = ERRORS.INVALID_DATA
    } else if (error.code === 11000) {
        statusCode = 400
        message = ERRORS.VALIDATION_FAILED

        const field = Object.keys(error.keyValue || {})[0] || "email"

        error.errors = {
            [field]: field === "email" ? AUTH_ERRORS.EMAIL_IN_USE : `${field} is already in use`
        }
    } else {
        console.error("UNEXPECTED SERVER ERROR:", error)
        statusCode = 500
        message = ERRORS.SERVER_ERROR
        error.errors = { general: ERRORS.SERVER_ERROR }
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: error.errors || null
    })
}
