import AppError from "../errors/AppError.js"

export default function validateUpdateNote(req, res, next) {
    const allowedFields = [
        "content",
        "page"
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

    const { content, page } = req.body

    if (content !== undefined) {
        if (content === null) {
            errors.content = "Note content is required"
        } else if (typeof content !== "string") {
            errors.content = "Note content must be a text value"
        } else if (content.trim() === "") {
            errors.content = "Note content is required"
        }
    }

    if (page !== undefined && page !== null) {
        if (!Number.isFinite(page)) {
            errors.page = "Page must be a valid number"
        } else if (page < 1) {
            errors.page = "Page must be at least 1"
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