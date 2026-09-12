import AppError from "../errors/AppError.js"
import { NOTE_CONTENT_ERRORS, PAGE_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateCreateNote(req, res, next) {
    const errors = {}

    const { content, page } = req.body

    if (content == null) {
        errors.content = NOTE_CONTENT_ERRORS.REQUIRED
    } else if (typeof content !== "string") {
        errors.content = NOTE_CONTENT_ERRORS.NOT_STRING
    } else if (content.trim() === "") {
        errors.content = NOTE_CONTENT_ERRORS.REQUIRED
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