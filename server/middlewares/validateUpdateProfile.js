import AppError from "../errors/AppError.js"

export default function validateUpdateProfile(req, res, next) {
    const allowedFields = ["name", "surname"]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0 && !req.file) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    const errors = {}
    const { name, surname } = req.body  

    const nameSurnameRegex = /^[\p{L}\s]+$/u

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            errors.name = "Name is required"
        } else if (name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters long"
        } else if (name.trim().length > 50) {
            errors.name = "Name cannot be longer than 50 characters"
        } else if (!nameSurnameRegex.test(name.trim())) {
            errors.name = "Name must consist only of letters"
        }
    }

    if (surname !== undefined) {
        if (typeof surname !== "string" || surname.trim() === "") {
            errors.surname = "Surname is required"
        } else if (surname.trim().length < 2) {
            errors.surname = "Surname must be at least 2 characters long"
        } else if (surname.trim().length > 50) {
            errors.surname = "Surname cannot be longer than 50 characters"
        } else if (!nameSurnameRegex.test(surname.trim())) {
            errors.surname = "Surname must consist only of letters"
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