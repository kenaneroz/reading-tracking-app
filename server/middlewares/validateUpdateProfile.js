import AppError from "../errors/AppError.js"
import { ERRORS, NAME_ERRORS, SURNAME_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateUpdateProfile(req, res, next) {
    const allowedFields = ["name", "surname"]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0 && !req.file) {
        throw new AppError(ERRORS.NO_FIELDS, 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError(ERRORS.INVALID_FIELDS, 400)
    }

    const errors = {}
    const { name, surname } = req.body  

    const nameSurnameRegex = /^[\p{L}\s]+$/u

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.name = NAME_ERRORS.REQUIRED
        } else if (name.trim().length < 2) {
            errors.name = NAME_ERRORS.TOO_SHORT
        } else if (name.trim().length > 50) {
            errors.name = NAME_ERRORS.TOO_LONG
        } else if (!nameSurnameRegex.test(name.trim())) {
            errors.name = NAME_ERRORS.LETTERS_ONLY
        }
    }

    if (surname !== undefined) {
        if (typeof surname !== "string" || surname.trim() === "") {
            errors.surname = SURNAME_ERRORS.REQUIRED
        } else if (surname.trim().length < 2) {
            errors.surname = SURNAME_ERRORS.TOO_SHORT
        } else if (surname.trim().length > 50) {
            errors.surname = SURNAME_ERRORS.TOO_LONG
        } else if (!nameSurnameRegex.test(surname.trim())) {
            errors.surname = SURNAME_ERRORS.LETTERS_ONLY
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