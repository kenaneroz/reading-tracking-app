import AppError from "../errors/AppError.js"

export default function validateSingleFile(req, res, next) {
    const requestFields = Object.keys(req.body || {})
    if (requestFields.length > 0) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    if (!req.file) {
        throw new AppError("No fields to update", 400)
    }

    next()
}