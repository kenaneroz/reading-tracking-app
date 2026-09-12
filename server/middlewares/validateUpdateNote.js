import AppError from "../errors/AppError.js"
import { ERRORS, NOTE_CONTENT_ERRORS, PAGE_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateUpdateNote(req, res, next) {
    const allowedFields = [
        "content",
        "page"
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

    const { content, page } = req.body

    if (content !== undefined) {
        if (content === null) {
            errors.content = NOTE_CONTENT_ERRORS.REQUIRED
        } else if (typeof content !== "string") {
            errors.content = NOTE_CONTENT_ERRORS.NOT_STRING
        } else if (content.trim() === "") {
            errors.content = NOTE_CONTENT_ERRORS.REQUIRED
        }
    }

    if (page !== undefined && page !== null) {
        if (!Number.isFinite(page)) {
            errors.page = PAGE_ERRORS.INVALID
        } else if (page < 1) {
            errors.page = PAGE_ERRORS.TOO_LOW
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