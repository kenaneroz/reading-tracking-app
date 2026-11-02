import { EMAIL_ERRORS, PASSWORD_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateLogin(formData) {
    const errors = {}

    let {
        email,
        password
    } = formData || {}

    if (typeof email === "string") email = email.trim().toLowerCase()
    if (typeof password === "string") password = password.trim()

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email != null && typeof email !== "string") {
        errors.email = EMAIL_ERRORS.NOT_STRING
    } else if (email == null || email === "") {
        errors.email = EMAIL_ERRORS.REQUIRED
    } else if (!emailRegex.test(email)) {
        errors.email = EMAIL_ERRORS.INVALID
    }

    if (password != null && typeof password !== "string") {
        errors.password = PASSWORD_ERRORS.NOT_STRING
    } else if (password == null || password === "") {
        errors.password = PASSWORD_ERRORS.REQUIRED
    }

    return errors
}