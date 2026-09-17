import mongoose from "mongoose"
import AppError from "../errors/AppError.js"

export default function validateDeleteBooks(req, res, next) {
    const bookIds = req.body

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
        throw new AppError("A list of book IDs must be provided", 400)
    }

    const MAX_LIMIT = 50
    if (bookIds.length > MAX_LIMIT) {
        throw new AppError(`Cannot delete more than ${MAX_LIMIT} books at once`, 400)
    }

    const uniqueIds = [...new Set(bookIds)]

    const hasInvalidId = uniqueIds.some(id => typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id))

    if (hasInvalidId) {
        throw new AppError("Invalid ID", 400)
    }

    req.body = uniqueIds
    next()
}