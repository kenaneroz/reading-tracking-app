import { TITLE_ERRORS, AUTHOR_ERRORS, GENRE_ERRORS, TOTAL_PAGES_ERRORS, CURRENT_PAGE_ERRORS, FORMAT_ERRORS, BOOK_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateUpdateBook(formData = {}, originalBook = {}) {
    const errors = {}

    if (formData.title !== undefined) {
        if (formData.title === null || typeof formData.title !== "string" || formData.title.trim() === "") {
            errors.title = TITLE_ERRORS.REQUIRED
        }
    }

    if (formData.author !== undefined) {
        if (formData.author === null || typeof formData.author !== "string" || formData.author.trim() === "") {
            errors.author = AUTHOR_ERRORS.REQUIRED
        }
    }

    if (formData.genre !== undefined) {
        if (formData.genre === null || typeof formData.genre !== "string" || formData.genre.trim() === "") {
            errors.genre = GENRE_ERRORS.REQUIRED
        } 
    }

    if (formData.totalPages !== undefined) {
        const total = Number(formData.totalPages)
        if (formData.totalPages === null || formData.totalPages === "" || !Number.isFinite(total)) {
            errors.totalPages = TOTAL_PAGES_ERRORS.INVALID
        } else if (total < 1) {
            errors.totalPages = TOTAL_PAGES_ERRORS.TOO_LOW
        }
    }

    if (formData.currentPage !== undefined) {
        const total = formData.totalPages !== undefined
            ? Number(formData.totalPages)
            : Number(originalBook.totalPages)
        
        const previousCurrent = originalBook.currentPage !== undefined 
            ? Number(originalBook.currentPage) 
            : null

        const current = Number(formData.currentPage)

        if (formData.currentPage === null || formData.currentPage === "" || !Number.isFinite(current)) {
            errors.currentPage = CURRENT_PAGE_ERRORS.INVALID
        } else if (current < 0) {
            errors.currentPage = CURRENT_PAGE_ERRORS.NEGATIVE
        } else if (previousCurrent !== null && current < previousCurrent) {
            errors.currentPage = BOOK_ERRORS.PAGE_BELOW_PREVIOUS
        } else if (total && current > total) {
            errors.currentPage = BOOK_ERRORS.PAGE_EXCEEDS_TOTAL
        }
    }

    if (formData.format !== undefined) {
        if (formData.format === null || typeof formData.format !== "string" || formData.format.trim() === "") {
            errors.format = FORMAT_ERRORS.REQUIRED
        }
    }

    return errors
}