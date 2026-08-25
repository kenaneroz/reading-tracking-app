import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"

export default function validateCreateBook(req, res, next) {
    const errors = {}

    const {
        title,
        author,
        genre,
        cover,
        currentPage,
        totalPages,
        rating,
        format
    } = req.body

    if (
        typeof title !== "string" || title.trim() === "") {
        errors.title = "Title is required"
    }

    if (typeof author !== "string" || author.trim() === "") {
        errors.author = "Author is required"
    }

    if (typeof genre !== "string" || genre.trim() === "") {
        errors.genre = "Genre is required"
    } else if (!GENRE_OPTIONS.includes(genre.trim())) {
        errors.genre = "Invalid genre"
    }

    if (typeof cover !== "string" || cover.trim() === "") {
        errors.cover = "Cover is required"
    }

    if (typeof format !== "string" || format.trim() === "") {
        errors.format = "Format is required"
    } else if (!FORMAT_OPTIONS.includes(format.trim())) {
        errors.format = "Invalid format"
    }

    if (totalPages == null || !Number.isFinite(totalPages)) {
        errors.totalPages = "Total pages must be a valid number"
    } else if (totalPages < 1) {
        errors.totalPages = "Total pages must be at least 1"
    }

    const hasCurrentPage = currentPage !== undefined && currentPage !== null && currentPage !== ""
    if (hasCurrentPage) {
        if (!Number.isFinite(currentPage)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (currentPage < 0) {
            errors.currentPage = "Current page cannot be negative"
        } else if (!errors.totalPages && currentPage > totalPages) {
            errors.currentPage = "Current page cannot exceed total pages"
        }
    }

    const hasRating = rating !== undefined && rating !== null && rating !== ""
    if (hasRating && !RATING_OPTIONS.includes(rating)) {
        errors.rating = "Invalid rating"
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
    req.body.cover = cover.trim()
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