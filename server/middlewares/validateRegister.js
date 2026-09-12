import { NAME_ERRORS, SURNAME_ERRORS, EMAIL_ERRORS, PASSWORD_ERRORS } from "../../shared/constants/errorMessages.js"

export default function validateRegister(req, res, next) {
    const errors = {}

    const {
        name,
        surname,
        email,
        password
    } = req.body

    const nameSurnameRegex = /^[\p{L}\s]+$/u

    if (name == null || typeof name !== "string" || name.trim() === "") {
        errors.name = NAME_ERRORS.REQUIRED
    } else if (name.trim().length < 2) {
        errors.name = NAME_ERRORS.TOO_SHORT
    } else if (name.trim().length > 50) {
        errors.name = NAME_ERRORS.TOO_LONG
    } else if (!nameSurnameRegex.test(name.trim())) {
        errors.name = NAME_ERRORS.LETTERS_ONLY
    }

    if (surname == null || typeof surname !== "string" || surname.trim() === "") {
        errors.surname = SURNAME_ERRORS.REQUIRED
    } else if (surname.trim().length < 2) {
        errors.surname = SURNAME_ERRORS.TOO_SHORT
    } else if (surname.trim().length > 50) {
        errors.surname = SURNAME_ERRORS.TOO_LONG
    } else if (!nameSurnameRegex.test(surname.trim())) {
        errors.surname = SURNAME_ERRORS.LETTERS_ONLY
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email == null || typeof email !== "string" || email.trim() === "") {
        errors.email = EMAIL_ERRORS.REQUIRED
    } else if (email.length > 254) {
        errors.email = EMAIL_ERRORS.TOO_LONG
    } else if (!emailRegex.test(email.trim())) {
        errors.email = EMAIL_ERRORS.INVALID
    }

    if (password == null || typeof password !== "string" || password.trim() === "") {
        errors.password = PASSWORD_ERRORS.REQUIRED
    } else if (password.length < 8) {
        errors.password = PASSWORD_ERRORS.TOO_SHORT
    } else if (password.length > 128) {
        errors.password = PASSWORD_ERRORS.TOO_LONG
    } else if (!/[A-Z]/.test(password)) {
        errors.password = PASSWORD_ERRORS.NO_UPPERCASE
    } else if (!/[a-z]/.test(password)) {
        errors.password = PASSWORD_ERRORS.NO_LOWERCASE
    } else if (!/[0-9]/.test(password)) {
        errors.password = PASSWORD_ERRORS.NO_NUMBER
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        errors.password = PASSWORD_ERRORS.NO_SPECIAL
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