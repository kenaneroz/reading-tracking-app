import { NOTE_CONTENT_ERRORS, PAGE_ERRORS, NOTE_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateUpdateNote(formData = {}, book = {}) {
    const errors = {}

    const { content, page } = formData

    const MIN_CONTENT_LENGTH = 3
    const MAX_CONTENT_LENGTH = 500

    if (content !== undefined) {
        if (content === null || typeof content !== "string" || content.trim() === "") {
            errors.content = NOTE_CONTENT_ERRORS.REQUIRED
        } else if (content.trim().length < MIN_CONTENT_LENGTH) {
            errors.content = NOTE_CONTENT_ERRORS.TOO_SHORT
        } else if (content.trim().length > MAX_CONTENT_LENGTH) {
            errors.content = NOTE_CONTENT_ERRORS.TOO_LONG
        }
    }

    if (page !== undefined && page !== null && page !== "") {
        const pageNum = Number(page)
        const totalPages = book.totalPages !== undefined ? Number(book.totalPages) : null

        if (!Number.isFinite(pageNum)) {
            errors.page = PAGE_ERRORS.INVALID
        } else if (pageNum < 1) {
            errors.page = PAGE_ERRORS.TOO_LOW
        } else if (totalPages !== null && Number.isFinite(totalPages) && pageNum > totalPages) {
            errors.page = NOTE_ERRORS.PAGE_EXCEEDS_TOTAL
        }
    }

    return errors
}