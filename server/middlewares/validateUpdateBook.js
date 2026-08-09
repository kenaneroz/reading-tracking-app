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
        "format"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field => allowedFields.includes(field))
    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

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
        if (title === null || title.trim() === "") {
            throw new AppError("Title cannot be empty", 400)
        }
    }

    if (author !== undefined) {
        if (author === null || author.trim() === "") {
            throw new AppError("Author cannot be empty", 400)
        }
    }

    if (genre !== undefined) {
        if (!GENRE_OPTIONS.includes(genre)) {
            throw new AppError("Invalid genre", 400)
        }
    }

    if (cover !== undefined) {
        if (cover === null || cover.trim() === "") {
            throw new AppError("Cover cannot be empty", 400)
        }
    }

    if (currentPage !== undefined) {
        if (!Number.isFinite(currentPage)) {
            throw new AppError("Current page must be a valid number", 400)
        }

        if (currentPage < 0) {
            throw new AppError("Current page cannot be negative", 400)
        }
    }

    if (totalPages !== undefined) {
        if (!Number.isFinite(totalPages)) {
            throw new AppError("Total pages must be a valid number", 400)
        }

        if (totalPages < 1) {
            throw new AppError("Total pages must be at least 1", 400)
        }
    }

    if (rating !== undefined) {
        if (typeof(rating) !== "number" && !RATING_OPTIONS.includes(rating) && (Number(rating) < 1 || Number(rating) > 5)) {
            throw new AppError("Rating must be a number between 1 and 5", 400)
        }
    }

    if (format !== undefined) {
        if (!FORMAT_OPTIONS.includes(format)) {
            throw new AppError("Invalid format", 400)
        }
    }

    next()
}