export default function validateForgotPassword(formData) {
    const errors = {}
    const { email } = formData

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    if (typeof email !== "string" || email.trim() === "") {
        errors.email = "Email is required"

    } else if (email.length > 254) {
        errors.email =
            "Email cannot be longer than 254 characters"

    } else if (!emailRegex.test(email.trim())) {
        errors.email = "Invalid email address"
    }

    return errors
}