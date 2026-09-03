import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, ResetPasswordIcon } from "@hugeicons/core-free-icons"

import Input from "../components/shared/form/Input"
import Button from "../components/shared/Button"
import { useAuth } from "../context/authContext"
import validateForgotPassword from "../utils/validators/validateForgotPassword"
import BackButton from "../components/shared/BackButton"

export default function ForgotPasswordScreen() {
    const navigate = useNavigate()
    const { forgotPassword } = useAuth()

    const [formData, setFormData] = useState({ email: "" })
    const [errors, setErrors] = useState({})
    const [sending, setSending] = useState(false)

    async function handleSendMail() {
        setSending(true)
        setErrors({})

        try {
            const validationErrors = validateForgotPassword(formData)
            const hasErrors = Object.keys(validationErrors).length > 0

            if (hasErrors) {
                setErrors(validationErrors)
                return
            }

            await forgotPassword(formData)
            navigate("/forgot-password/check-email")
        } catch (error) {
            setErrors(error.errors || {})
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-5 pt-5">
                <BackButton disabled={sending} />
            </div>

            <div className="mt-15 px-5">
                <div className="relative flex justify-center items-center">
                    <img src="/neutral.svg" alt="" className="h-25 w-25" />
                    <HugeiconsIcon
                        icon={ResetPasswordIcon}
                        size={40}
                        strokeWidth={1.5}
                        className="text-espresso absolute"
                    />
                </div>

                <div className="mt-6 text-center">
                    <h1 className="h1 text-espresso">Reset your password</h1>
                    <p className="text-body-sm text-taupe mt-2">
                        Enter the email address associated with your account and we'll send you instructions to reset your password.
                    </p>
                </div>

                <div className="mt-8">
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        errorMessage={errors.email}
                    />

                    <Button
                        onClick={handleSendMail}
                        className="mt-5"
                        disabled={sending}
                    >
                        <span>{sending ? "Sending" : "Send reset link"}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}