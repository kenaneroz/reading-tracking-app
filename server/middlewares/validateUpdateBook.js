import AppError from "../errors/AppError.js"
import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"
import { ERRORS, TITLE_ERRORS, AUTHOR_ERRORS, GENRE_ERRORS, FORMAT_ERRORS, TOTAL_PAGES_ERRORS, CURRENT_PAGE_ERRORS, RATING_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateUpdateBook(req, res, next) {
    const allowedFields = [
        "title",
        "author",
        "genre",
        "currentPage",
        "totalPages",
        "rating",
        "format",
        "readingActivity",
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

    const {
        title,
        author,
        genre,
        currentPage,
        totalPages,
        rating,
        format
    } = req.body

    if (title !== undefined) {
        if (title === null) {
            errors.title = TITLE_ERRORS.REQUIRED
        } else if (typeof title !== "string") {
            errors.title = TITLE_ERRORS.NOT_STRING
        } else if (title.trim() === "") {
            errors.title = TITLE_ERRORS.REQUIRED
        }
    }

    if (author !== undefined) {
        if (author === null) {
            errors.author = AUTHOR_ERRORS.REQUIRED
        } else if (typeof author !== "string") {
            errors.author = AUTHOR_ERRORS.NOT_STRING
        } else if (author.trim() === "") {
            errors.author = AUTHOR_ERRORS.REQUIRED
        }
    }

    if (genre !== undefined) {
        if (genre === null || genre === "") {
            errors.genre = GENRE_ERRORS.REQUIRED
        } else if (typeof genre !== "string") {
            errors.genre = GENRE_ERRORS.NOT_STRING
        } else if (!GENRE_OPTIONS.includes(genre)) {
            errors.genre = GENRE_ERRORS.INVALID
        }
    }

    if (currentPage !== undefined) {
        if (!Number.isFinite(currentPage)) {
            errors.currentPage = CURRENT_PAGE_ERRORS.INVALID
        } else if (currentPage < 0) {
            errors.currentPage = CURRENT_PAGE_ERRORS.NEGATIVE
        }
    }

    if (totalPages !== undefined) {
        if (!Number.isFinite(totalPages)) {
            errors.totalPages = TOTAL_PAGES_ERRORS.INVALID
        } else if (totalPages < 1) {
            errors.totalPages = TOTAL_PAGES_ERRORS.TOO_LOW
        }
    }

    if (rating !== undefined) {
        if (!RATING_OPTIONS.includes(rating)) {
            errors.rating = RATING_ERRORS.INVALID
        }
    }

    if (format !== undefined) {
        if (format === null || format === "") {
            errors.format = FORMAT_ERRORS.REQUIRED
        } else if (typeof format !== "string") {
            errors.format = FORMAT_ERRORS.NOT_STRING
        } else if (!FORMAT_OPTIONS.includes(format)) {
            errors.format = FORMAT_ERRORS.INVALID
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