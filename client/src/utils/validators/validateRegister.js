import { NAME_ERRORS, SURNAME_ERRORS, EMAIL_ERRORS, PASSWORD_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateRegister(formData) {
    const errors = {}
    let {
        name,
        surname,
        email,
        password
    } = formData || {}

    if (typeof name === "string") name = name.trim()
    if (typeof surname === "string") surname = surname.trim()
    if (typeof email === "string") email = email.trim()

    const nameSurnameRegex = /^\p{L}+(?:['-]\p{L}+)*$/u

    if (name != null && typeof name !== "string") {
        errors.name = NAME_ERRORS.NOT_STRING
    } else if (name == null || name === "") {
        errors.name = NAME_ERRORS.REQUIRED
    } else if (name.length < 2) {
        errors.name = NAME_ERRORS.TOO_SHORT
    } else if (name.length > 50) {
        errors.name = NAME_ERRORS.TOO_LONG
    } else if (!nameSurnameRegex.test(name)) {
        errors.name = NAME_ERRORS.INVALID
    }

    if (surname != null && typeof surname !== "string") {
        errors.surname = SURNAME_ERRORS.NOT_STRING
    } else if (surname == null || surname === "") {
        errors.surname = SURNAME_ERRORS.REQUIRED
    } else if (surname.length < 2) {
        errors.surname = SURNAME_ERRORS.TOO_SHORT
    } else if (surname.length > 50) {
        errors.surname = SURNAME_ERRORS.TOO_LONG
    } else if (!nameSurnameRegex.test(surname)) {
        errors.surname = SURNAME_ERRORS.INVALID
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email != null && typeof email !== "string") {
        errors.email = EMAIL_ERRORS.NOT_STRING
    } else if (email == null || email === "") {
        errors.email = EMAIL_ERRORS.REQUIRED
    } else if (email.length > 254) {
        errors.email = EMAIL_ERRORS.TOO_LONG
    } else if (!emailRegex.test(email)) {
        errors.email = EMAIL_ERRORS.INVALID
    }

    if (password != null && typeof password !== "string") {
        errors.password = PASSWORD_ERRORS.NOT_STRING
    } else if (password == null || password.trim() === "") {
        errors.password = PASSWORD_ERRORS.REQUIRED
    } else if (/\s/.test(password)) {
        errors.password = PASSWORD_ERRORS.NO_SPACES
    } else if (password.length < 8) {
        errors.password = PASSWORD_ERRORS.TOO_SHORT
    } else if (password.length > 64) {
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

    return errors
}
