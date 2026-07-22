import AppError from "../errors/AppError.js"
import { validGenres } from "../constants/genres.js"

export default function validateCreateBook(req, res, next) {
    const { 
        title, 
        author, 
        genre, 
        cover, 
        currentPage, 
        totalPages 
    } = req.body

    if (
        title == null ||
        author == null ||
        genre == null ||
        cover == null ||
        totalPages == null
    ) {
        throw new AppError("You must fill in the required fields", 400)
    }

    if (
        typeof title !== "string" || 
        typeof author !== "string" ||
        typeof genre !== "string" ||
        typeof cover !== "string"
    ) {
        throw new AppError("Field/s must be text values", 400)
    }

    if (
        title.trim() === "" ||
        author.trim() === "" ||
        genre.trim() === "" ||
        cover.trim() === ""
    ) {
        throw new AppError("You must fill in the required fields", 400)
    }

    if (!validGenres.includes(genre)) {
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

    next()
}