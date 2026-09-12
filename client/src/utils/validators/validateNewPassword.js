import validatePasswordStrength from "./validatePasswordStrength.js"
import { AUTH_ERRORS } from "../../../../shared/constants/errorMessages.js"

export default function validateNewPassword(formData) {
    const {
        newPassword,
        confirmNewPassword
    } = formData

    const errors = {}

    errors.newPassword = validatePasswordStrength(newPassword)
    if (errors.newPassword == null) delete errors.newPassword

    if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = AUTH_ERRORS.PASSWORDS_NO_MATCH
    }

    return errors
}