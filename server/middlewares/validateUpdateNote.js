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

    const hasValidFields = requestFields.every(field => allowedFields.includes(field))
    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    const { content, page } = req.body

    if (content !== undefined) {
        if (typeof content !== "string") {
            throw new AppError("Invalid note content", 400)
        }

        if (content.trim() === "") {
            throw new AppError("Note content cannot be empty", 400)
        }
    }

    if (page !== undefined && page !== null) {
        if (!Number.isFinite(page)) {
            throw new AppError("Page must be a valid number", 400)
        }

        if (page < 1) {
            throw new AppError("Page must be at least 1", 400)
        }
    }

    next()
}