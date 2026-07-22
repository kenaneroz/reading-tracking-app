export default function errorMiddleware(error, req, res, next) {
    let statusCode, message

    if (error.name === "CastError") {
        statusCode = 400
        message = "Invalid ID format"
    } else if (error.name === "ValidationError") {
        statusCode = 400
        message = "Invalid data entry"
    } else {
        statusCode = error.statusCode || 500
        message = statusCode === 500 ? "Internal server error" : error.message
    }

    res.status(statusCode).json({
        success: false,
        message
    })
}