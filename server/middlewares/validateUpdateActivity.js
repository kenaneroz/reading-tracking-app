import AppError from "../errors/AppError.js"
import { ERRORS, CURRENT_PAGE_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateUpdateActivity(req, res, next) {
    const allowedFields = [
        "currentPage"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError(ERRORS.NO_FIELDS, 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError(ERRORS.INVALID_FIELDS, 400)
    }

    const errors = {}

    const { currentPage } = req.body

    if (!Number.isFinite(currentPage)) {
        errors.currentPage = CURRENT_PAGE_ERRORS.INVALID
    } else if (currentPage < 0) {
        errors.currentPage = CURRENT_PAGE_ERRORS.NEGATIVE
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