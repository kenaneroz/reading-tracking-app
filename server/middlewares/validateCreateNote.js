import AppError from "../errors/AppError.js"

export default function validateCreateNote(req, res, next) {
    const { content, page } = req.body

    if (content == null) {
        throw new AppError("Note content is required", 400)
    }

    if (typeof content !== "string") {
        throw new AppError("Invalid note content", 400)
    }

    if (content.trim() === "") {
        throw new AppError("Note content cannot be empty", 400)
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