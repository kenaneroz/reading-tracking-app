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
        errors.name = "Name is required"
    } else if (name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long"
    } else if (name.trim().length > 50) {
        errors.name = "Name cannot be longer than 50 characters"
    } else if (!nameSurnameRegex.test(name.trim())) {
        errors.name = "Name must consist only of letters"
    }

    if (surname == null || typeof surname !== "string" || surname.trim() === "") {
        errors.surname = "Surname is required"
    } else if (surname.trim().length < 2) {
        errors.surname = "Surname must be at least 2 characters long"
    } else if (surname.trim().length > 50) {
        errors.surname = "Surname cannot be longer than 50 characters"
    } else if (!nameSurnameRegex.test(surname.trim())) {
        errors.surname = "Surname must consist only of letters"
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (email == null || typeof email !== "string" || email.trim() === "") {
        errors.email = "Email is required"
    } else if (email.length > 254) {
        errors.email = "Email cannot be longer than 254 characters"
    } else if (!emailRegex.test(email.trim())) {
        errors.email = "Invalid email address"
    }

    if (password == null || typeof password !== "string" || password.trim() === "") {
        errors.password = "Password is required"
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long"
    } else if (password.length > 128) {
        errors.password = "Password cannot be longer than 128 characters"
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(password)) {
        errors.password = "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number"
    } else if (!/[^A-Za-z0-9]/.test(password)) {
        errors.password = "Password must contain at least one special character"
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