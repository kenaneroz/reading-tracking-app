import { ERRORS } from "../../shared/constants/errorMessages.js"

export default function errorMiddleware(error, req, res, next) {
    let statusCode, message

    if (error.name === "CastError") {
        statusCode = 400
        message = ERRORS.INVALID_ID
    } else if (error.name === "ValidationError") {
        statusCode = 400
        message = ERRORS.INVALID_DATA
    } else {
        statusCode = error.statusCode || 500
        message = error.message
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: error.errors || null
    })
}