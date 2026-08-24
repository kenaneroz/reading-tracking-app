export default function validateUpdateUser(req, res, next) {
    const allowedFields = [
        "profilePhoto",
        "name",
        "surname",
        "email",
        "currentPassword",
        "newPassword",
        "confirmNewPassword"
    ]

    const requestFields = Object.keys(req.body)

    if (requestFields.length === 0) {
        throw new AppError("No fields to update", 400)
    }

    const hasValidFields = requestFields.every(field =>
        allowedFields.includes(field)
    )

    if (!hasValidFields) {
        throw new AppError("Invalid field/s included in update", 400)
    }

    const errors = {}

    const {
        profilePhoto,
        name,
        surname,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
    } = req.body

    const nameSurnameRegex = /^[\p{L}\s]+$/u

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    // Profile photo

    if (profilePhoto != null) {

        if (typeof profilePhoto !== "string") {
            errors.profilePhoto = "Profile photo must be a string"

        } else if (profilePhoto.trim() === "") {
            errors.profilePhoto = "Profile photo cannot be empty"

        } else if (profilePhoto.length > 2048) {
            errors.profilePhoto =
                "Profile photo URL cannot be longer than 2048 characters"
        }
    }

    // Name

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

    // Surname

    if (surname !== undefined) {

        if (typeof surname !== "string" || surname.trim() === "") {
            errors.surname = "Surname is required"

        } else if (surname.trim().length < 2) {
            errors.surname =
                "Surname must be at least 2 characters long"

        } else if (surname.trim().length > 50) {
            errors.surname =
                "Surname cannot be longer than 50 characters"

        } else if (!nameSurnameRegex.test(surname.trim())) {
            errors.surname = "Surname must consist only of letters"
        }
    }

    // Email

    if (email !== undefined) {

        if (typeof email !== "string" || email.trim() === "") {
            errors.email = "Email is required"

        } else if (email.length > 254) {
            errors.email =
                "Email cannot be longer than 254 characters"

        } else if (!emailRegex.test(email.trim())) {
            errors.email = "Invalid email address"
        }
    }

    // Password

    if (newPassword !== undefined) {

        if (typeof newPassword !== "string" || newPassword === "") {
            errors.newPassword = "New password is required"

        } else if (newPassword.length < 8) {
            errors.newPassword =
                "New password must be at least 8 characters long"

        } else if (newPassword.length > 128) {
            errors.newPassword =
                "New password cannot be longer than 128 characters"

        } else if (!/[A-Z]/.test(newPassword)) {
            errors.newPassword =
                "New password must contain at least one uppercase letter"

        } else if (!/[a-z]/.test(newPassword)) {
            errors.newPassword =
                "New password must contain at least one lowercase letter"

        } else if (!/[0-9]/.test(newPassword)) {
            errors.newPassword =
                "New password must contain at least one number"

        } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
            errors.newPassword =
                "New password must contain at least one special character"
        }

        if (
            currentPassword === undefined ||
            typeof currentPassword !== "string" ||
            currentPassword === ""
        ) {
            errors.currentPassword =
                "Current password is required"
        }

        if (
            confirmNewPassword === undefined ||
            typeof confirmNewPassword !== "string" ||
            confirmNewPassword === ""
        ) {
            errors.confirmNewPassword =
                "Password confirmation is required"

        } else if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword =
                "Passwords do not match"
        }

    } else {

        if (currentPassword !== undefined) {
            errors.currentPassword =
                "New password is required"
        }

        if (confirmNewPassword !== undefined) {
            errors.confirmNewPassword =
                "New password is required"
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