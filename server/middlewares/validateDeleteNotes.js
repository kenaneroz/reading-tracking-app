import mongoose from "mongoose"
import AppError from "../errors/AppError.js"

export default function validateDeleteNotes(req, res, next) {
    const noteIds = req.body

    if (!Array.isArray(noteIds) || noteIds.length === 0) {
        throw new AppError("A list of note IDs must be provided", 400)
    }

    const MAX_LIMIT = 50
    if (noteIds.length > MAX_LIMIT) {
        throw new AppError(`Cannot delete more than ${MAX_LIMIT} notes at once`, 400)
    }

    const uniqueIds = [...new Set(noteIds)]

    const hasInvalidId = uniqueIds.some(id => typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id))

    if (hasInvalidId) {
        throw new AppError("Invalid ID", 400)
    }

    req.body = uniqueIds
    next()
}