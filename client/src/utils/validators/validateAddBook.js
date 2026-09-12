import { TITLE_ERRORS, AUTHOR_ERRORS, GENRE_ERRORS, FORMAT_ERRORS, TOTAL_PAGES_ERRORS, CURRENT_PAGE_ERRORS, BOOK_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateAddBook(formData, books = []) {
    const errors = {}

    const cleanTitle = formData.title?.trim()
    if (!cleanTitle) {
        errors.title = TITLE_ERRORS.REQUIRED
    } else {
        const isExist = books.some(
            book => book.title?.trim().toLowerCase() === cleanTitle.toLowerCase()
        )
        if (isExist) {
            errors.title = BOOK_ERRORS.ALREADY_IN_LIBRARY
        }
    }

    if (!formData.author || formData.author.trim() === "") {
        errors.author = AUTHOR_ERRORS.REQUIRED
    }

    if (!formData.genre || formData.genre.trim() === "") {
        errors.genre = GENRE_ERRORS.REQUIRED
    }

    if (!formData.format || formData.format.trim() === "") {
        errors.format = FORMAT_ERRORS.REQUIRED
    }

    const totalNum = Number(formData.totalPages)
    if (formData.totalPages === null || formData.totalPages === "" || formData.totalPages === undefined) {
        errors.totalPages = TOTAL_PAGES_ERRORS.REQUIRED
    } else if (!Number.isFinite(totalNum)) {
        errors.totalPages = TOTAL_PAGES_ERRORS.INVALID
    } else if (totalNum < 1) {
        errors.totalPages = TOTAL_PAGES_ERRORS.TOO_LOW
    }

    if (formData.currentPage !== null && formData.currentPage !== "" && formData.currentPage !== undefined) {
        const currentNum = Number(formData.currentPage)

        if (!Number.isFinite(currentNum)) {
            errors.currentPage = CURRENT_PAGE_ERRORS.INVALID
        } else if (currentNum < 0) {
            errors.currentPage = CURRENT_PAGE_ERRORS.NEGATIVE
        } else if (!errors.totalPages && currentNum > totalNum) {
            errors.currentPage = BOOK_ERRORS.PAGE_EXCEEDS_TOTAL
        }
    }

    return errors
}