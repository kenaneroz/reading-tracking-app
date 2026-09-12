import { ERRORS, EMAIL_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateUpdateEmail(email) {
    const errors = {}

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email !== undefined) {
        if (typeof email !== "string" || email.trim() === "") {
            errors.email = EMAIL_ERRORS.REQUIRED

        } else if (email.length > 254) {
            errors.email = EMAIL_ERRORS.TOO_LONG

        } else if (!emailRegex.test(email.trim())) {
            errors.email = EMAIL_ERRORS.INVALID
        }
    }

    return errors
}