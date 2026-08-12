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

    if (title == null) {
        errors.title = "Title is required"
    } else if (typeof title !== "string") {
        errors.title = "Title must be a text value"
    } else if (title.trim() === "") {
        errors.title = "Title is required"
    }

    if (author == null) {
        errors.author = "Author is required"
    } else if (typeof author !== "string") {
        errors.author = "Author must be a text value"
    } else if (author.trim() === "") {
        errors.author = "Author is required"
    }

    if (genre == null) {
        errors.genre = "Genre is required"
    } else if (typeof genre !== "string") {
        errors.genre = "Genre must be a text value"
    } else if (genre.trim() === "") {
        errors.genre = "Genre is required"
    } else if (!GENRE_OPTIONS.includes(genre)) {
        errors.genre = "Invalid genre"
    }

    if (cover == null) {
        errors.cover = "Cover is required"
    } else if (typeof cover !== "string") {
        errors.cover = "Cover must be a text value"
    } else if (cover.trim() === "") {
        errors.cover = "Cover is required"
    }

    if (format == null) {
        errors.format = "Format is required"
    } else if (typeof format !== "string") {
        errors.format = "Format must be a text value"
    } else if (format.trim() === "") {
        errors.format = "Format is required"
    } else if (!FORMAT_OPTIONS.includes(format)) {
        errors.format = "Invalid format"
    }

    if (totalPages == null) {
        errors.totalPages = "Total pages is required"
    } else if (!Number.isFinite(totalPages)) {
        errors.totalPages = "Total pages must be a valid number"
    } else if (totalPages < 1) {
        errors.totalPages = "Total pages must be at least 1"
    }
    
    if (currentPage !== undefined && currentPage !== null) {
        if (!Number.isFinite(currentPage)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (currentPage < 0) {
            errors.currentPage = "Current page cannot be negative"
        } else if (
            !errors.totalPages &&
            currentPage > totalPages
        ) {
            errors.currentPage = "Current page cannot exceed total pages"
        }
    }

    if (
        rating !== undefined &&
        rating !== null &&
        rating !== ""
    ) {
        if (!RATING_OPTIONS.includes(rating)) {
            errors.rating = "Invalid rating"
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