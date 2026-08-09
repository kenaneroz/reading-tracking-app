import AppError from "../errors/AppError.js"
import { GENRE_OPTIONS } from "../../shared/constants/genreOptions.js"
import { RATING_OPTIONS } from "../../shared/constants/ratingOptions.js"
import { FORMAT_OPTIONS } from "../../shared/constants/formatOptions.js"

export default function validateCreateBook(req, res, next) {
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
        title == null ||
        author == null ||
        genre == null ||
        cover == null ||
        totalPages == null ||
        format == null
    ) {
        throw new AppError("You must fill in the required fields", 400)
    }

    if (
        typeof title !== "string" || 
        typeof author !== "string" ||
        typeof genre !== "string" ||
        typeof cover !== "string" ||
        typeof format !== "string"
    ) {
        throw new AppError("Field/s must be text values", 400)
    }

    if (
        title.trim() === "" ||
        author.trim() === "" ||
        genre.trim() === "" ||
        cover.trim() === "" ||
        format.trim() === ""
    ) {
        throw new AppError("You must fill in the required fields", 400)
    }

    if (!GENRE_OPTIONS.includes(genre)) {
        throw new AppError("Invalid genre", 400)
    }

    const startingPage = currentPage ?? 0

    if (!Number.isFinite(startingPage) || !Number.isFinite(totalPages)) {
        throw new AppError("Page values must be valid numbers", 400)
    }

    if (startingPage < 0) {
        throw new AppError("Current page cannot be negative", 400)
    }

    if (totalPages < 1) {
        throw new AppError("Total pages must be at least 1", 400)
    }

    if (startingPage > totalPages) {
        throw new AppError("Current page cannot exceed total pages", 400)
    }
    
    if (typeof(rating) !== "number" && !RATING_OPTIONS.includes(rating) && (Number(rating) < 1 || Number(rating) > 5)) {
        throw new AppError("Rating must be a number between 1 and 5", 400)
    }

    if (!FORMAT_OPTIONS.includes(format)) {
        throw new AppError("Invalid format", 400)
    }

    next()
}