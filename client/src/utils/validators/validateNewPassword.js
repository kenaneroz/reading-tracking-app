export default function validateNewPassword(formData = {}) {
    const errors = {}
    const { 
        newPassword,
        confirmNewPassword 
    } = formData

    if (!newPassword.trim()) {
        errors.newPassword = "New password is required"
    } else if (newPassword.length < 8) {
        errors.newPassword = "New password must be at least 8 characters long"
    } else if (newPassword.length > 128) {
        errors.newPassword = "New password cannot be longer than 128 characters"
    } else if (!/[A-Z]/.test(newPassword)) {
        errors.newPassword = "New password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(newPassword)) {
        errors.newPassword = "New password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(newPassword)) {
        errors.newPassword = "New password must contain at least one number"
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
        errors.newPassword = "New password must contain at least one special character"
    }

    if (!confirmNewPassword.trim()) {
        errors.confirmNewPassword = "Confirm new password is required"
    } else if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = "Passwords don't match"
    }

    return errors
}