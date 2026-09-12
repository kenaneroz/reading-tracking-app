import { PASSWORD_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validatePasswordStrength(password) {
    if (typeof password !== "string" || password === "") {
        return PASSWORD_ERRORS.NEW_REQUIRED
    }

    if (password.length < 8) {
        return PASSWORD_ERRORS.NEW_TOO_SHORT
    }

    if (password.length > 128) {
        return PASSWORD_ERRORS.NEW_TOO_LONG
    }

    if (!/[A-Z]/.test(password)) {
        return PASSWORD_ERRORS.NEW_NO_UPPERCASE
    }

    if (!/[a-z]/.test(password)) {
        return PASSWORD_ERRORS.NEW_NO_LOWERCASE
    }

    if (!/[0-9]/.test(password)) {
        return PASSWORD_ERRORS.NEW_NO_NUMBER
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return PASSWORD_ERRORS.NEW_NO_SPECIAL
    }

    return null
}