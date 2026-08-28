export function validatePasswordStrength(password) {
    if (typeof password !== "string" || password === "") {
        return "New password is required"
    }

    if (password.length < 8) {
        return "New password must be at least 8 characters long"
    }

    if (password.length > 128) {
        return "New password cannot be longer than 128 characters"
    }

    if (!/[A-Z]/.test(password)) {
        return "New password must contain at least one uppercase letter"
    }

    if (!/[a-z]/.test(password)) {
        return "New password must contain at least one lowercase letter"
    }

    if (!/[0-9]/.test(password)) {
        return "New password must contain at least one number"
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return "New password must contain at least one special character"
    }

    return null
}