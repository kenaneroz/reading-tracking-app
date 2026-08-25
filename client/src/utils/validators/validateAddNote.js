export default function validateAddNote(formData = {}, book = {}) {
    const errors = {}

    const { content, page } = formData

    const MAX_CONTENT_LENGTH = 500
    const MIN_CONTENT_LENGTH = 3

    if (content == null) {
        errors.content = "Note content is required"
    } else if (typeof content !== "string") {
        errors.content = "Note content must be a text value"
    } else if (content.trim() === "") {
        errors.content = "Note content is required"
    } else if (content.trim().length < MIN_CONTENT_LENGTH) {
        errors.content = `Note content must be at least ${MIN_CONTENT_LENGTH} characters`
    } else if (content.trim().length > MAX_CONTENT_LENGTH) {
        errors.content = `Note content cannot exceed ${MAX_CONTENT_LENGTH} characters`
    }

    if (page !== undefined && page !== null && page !== "") {
        const pageNum = Number(page)
        const totalPages = book.totalPages !== undefined 
            ? Number(book.totalPages) 
            : null

        if (!Number.isFinite(pageNum)) {
            errors.page = "Page must be a valid number"
        } else if (pageNum < 1) {
            errors.page = "Page must be at least 1"
        } else if (totalPages !== null && Number.isFinite(totalPages) && pageNum > totalPages) {
            errors.page = "Page cannot exceed total pages"
        }
    }

    return errors
}