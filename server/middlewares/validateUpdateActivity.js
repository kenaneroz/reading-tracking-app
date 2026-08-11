import AppError from "../errors/AppError.js"

export default function validateUpdateActivity(req, res, next) {
    const allowedFields = [
        "currentPage"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field => allowedFields.includes(field))
    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    const { currentPage } = req.body

    if (!Number.isFinite(currentPage)) {
        throw new AppError(
            "Current page must be a valid number", 
            400
        )
    }

    next()
}