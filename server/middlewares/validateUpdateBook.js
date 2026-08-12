import AppError from "../errors/AppError.js"
import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"

export default function validateUpdateBook(req, res, next) {
    const allowedFields = [
        "title",
        "author",
        "genre",
        "cover",
        "currentPage",
        "totalPages",
        "rating",
        "format",
        "readingActivity",
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

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

    if (title !== undefined) {
        if (title === null) {
            errors.title = "Title is required"
        } else if (typeof title !== "string") {
            errors.title = "Title must be a text value"
        } else if (title.trim() === "") {
            errors.title = "Title is required"
        }
    }

    if (author !== undefined) {
        if (author === null) {
            errors.author = "Author is required"
        } else if (typeof author !== "string") {
            errors.author = "Author must be a text value"
        } else if (author.trim() === "") {
            errors.author = "Author is required"
        }
    }

    if (genre !== undefined) {
        if (genre === null || genre === "") {
            errors.genre = "Genre is required"
        } else if (typeof genre !== "string") {
            errors.genre = "Genre must be a text value"
        } else if (!GENRE_OPTIONS.includes(genre)) {
            errors.genre = "Invalid genre"
        }
    }

    if (cover !== undefined) {
        if (cover === null) {
            errors.cover = "Cover is required"
        } else if (typeof cover !== "string") {
            errors.cover = "Cover must be a text value"
        } else if (cover.trim() === "") {
            errors.cover = "Cover is required"
        }
    }

    if (currentPage !== undefined) {
        if (!Number.isFinite(currentPage)) {
            errors.currentPage = "Current page must be a valid number"
        } else if (currentPage < 0) {
            errors.currentPage = "Current page cannot be negative"
        }
    }

    if (totalPages !== undefined) {
        if (!Number.isFinite(totalPages)) {
            errors.totalPages = "Total pages must be a valid number"
        } else if (totalPages < 1) {
            errors.totalPages = "Total pages must be at least 1"
        }
    }

    if (rating !== undefined) {
        if (!RATING_OPTIONS.includes(rating)) {
            errors.rating = "Invalid rating"
        }
    }

    if (format !== undefined) {
        if (format === null || format === "") {
            errors.format = "Format is required"
        } else if (typeof format !== "string") {
            errors.format = "Format must be a text value"
        } else if (!FORMAT_OPTIONS.includes(format)) {
            errors.format = "Invalid format"
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