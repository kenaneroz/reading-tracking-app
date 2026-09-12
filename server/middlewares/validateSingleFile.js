import AppError from "../errors/AppError.js"
import { ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateSingleFile(req, res, next) {
    const requestFields = Object.keys(req.body || {})
    if (requestFields.length > 0) {
        throw new AppError(ERRORS.INVALID_FIELDS, 400)
    }

    if (!req.file) {
        throw new AppError(ERRORS.NO_FIELDS, 400)
    }

    next()
}