export default function validateForgotPassword(req, res, next) {
    const allowedFields = [ "email" ]

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

    const { email } = req.body

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

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

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        })
    }

    next()
}