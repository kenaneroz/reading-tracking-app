import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"
import { TITLE_ERRORS, AUTHOR_ERRORS, GENRE_ERRORS, FORMAT_ERRORS, TOTAL_PAGES_ERRORS, CURRENT_PAGE_ERRORS, RATING_ERRORS, BOOK_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateCreateBook(req, res, next) {
    const errors = {}

    const {
        title,
        author,
        genre,
        currentPage,
        totalPages,
        rating,
        format
    } = req.body

    if (
        typeof title !== "string" || title.trim() === "") {
        errors.title = TITLE_ERRORS.REQUIRED
    }

    if (typeof author !== "string" || author.trim() === "") {
        errors.author = AUTHOR_ERRORS.REQUIRED
    }

    if (typeof genre !== "string" || genre.trim() === "") {
        errors.genre = GENRE_ERRORS.REQUIRED
    } else if (!GENRE_OPTIONS.includes(genre.trim())) {
        errors.genre = GENRE_ERRORS.INVALID
    }

    if (typeof format !== "string" || format.trim() === "") {
        errors.format = FORMAT_ERRORS.REQUIRED
    } else if (!FORMAT_OPTIONS.includes(format.trim())) {
        errors.format = FORMAT_ERRORS.INVALID
    }

    if (totalPages == null || !Number.isFinite(totalPages)) {
        errors.totalPages = TOTAL_PAGES_ERRORS.INVALID
    } else if (totalPages < 1) {
        errors.totalPages = TOTAL_PAGES_ERRORS.TOO_LOW
    }

    const hasCurrentPage = currentPage !== undefined && currentPage !== null && currentPage !== ""
    if (hasCurrentPage) {
        if (!Number.isFinite(currentPage)) {
            errors.currentPage = CURRENT_PAGE_ERRORS.INVALID
        } else if (currentPage < 0) {
            errors.currentPage = CURRENT_PAGE_ERRORS.NEGATIVE
        } else if (!errors.totalPages && currentPage > totalPages) {
            errors.currentPage = BOOK_ERRORS.PAGE_EXCEEDS_TOTAL
        }
    }

    const hasRating = rating !== undefined && rating !== null && rating !== ""
    if (hasRating && !RATING_OPTIONS.includes(rating)) {
        errors.rating = RATING_ERRORS.INVALID
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        })
    }

    req.body.title = title.trim()
    req.body.author = author.trim()
    req.body.genre = genre.trim()
    req.body.format = format.trim()

    if (!hasCurrentPage) {
        delete req.body.currentPage
    }

    if (!hasRating) {
        delete req.body.rating
    }

    next()
}