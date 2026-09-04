import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, ResetPasswordIcon } from "@hugeicons/core-free-icons"

import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"
import { useNavigate, useSearchParams } from "react-router-dom"

import { useAuth } from "../context/authContext"
import validateNewPassword from "../utils/validators/validateNewPassword"
import ConfirmationScreen from "../components/shared/ConfirmationScreen"
import { useEffect } from "react"

export default function CreateNewPasswordScreen() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })
    const [errors, setErrors] = useState({})
    const { verifyResetToken, resetPassword } = useAuth()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [loading, setLoading] = useState(false)
    const [verifying, setVerifying] = useState(true)

    const navigate = useNavigate()  

    useEffect(() => {
        if (!token) {
            setErrors({ link: "Invalid or expired link" })
            setVerifying(false)
            return
        }

        async function verifyToken() {
            try {
                await verifyResetToken(token)
            } catch (error) {
                setErrors(error.errors || {})
                console.error(error)
            } finally {
                setVerifying(false)
            }
        }

        verifyToken()
    }, [])

    async function handleReset() {
        setLoading(true)
        setErrors({})

        try {
            const validationErrors = validateNewPassword(formData)
            const hasErrors = Object.keys(validationErrors).length > 0

            if (hasErrors) {
                setErrors(validationErrors)
                return
            }

            await resetPassword(token, formData)
            navigate("/reset-password/success")
        } catch (error) {
            setErrors(error.errors || {})
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (verifying) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-espresso text-body">Verifying...</p>
            </div>
        )
    }

    if (errors.link) {
        return (
            <ConfirmationScreen 
                title="Invalid or expired link"
                message="This password reset link is invalid or has expired. Please request a new one."
                buttonText="Request new link"
                onPrimaryClick={() => navigate("/forgot-password")}
            />           
        )        
    }

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
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
                    <h1 className="h1 text-espresso">Create new password</h1>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-5">
                        <PasswordInput 
                            id="new-password"
                            label="New password"
                            placeholder="New password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
                            errorMessage={errors.newPassword}
                        />

                        <PasswordInput 
                            id="confirm-new-password"
                            label="Confirm new password"
                            placeholder="Confirm new password"
                            value={formData.confirmNewPassword}
                            onChange={(e) => setFormData(prev => ({...prev, confirmNewPassword: e.target.value}))}
                            errorMessage={errors.confirmNewPassword}
                        />
                    </div>

                    <Button
                        onClick={handleReset}
                        className="mt-7"
                        disabled={loading}
                    >
                        <span>{loading ? "Resetting" : "Reset password"}</span>
                    </Button>
                </div>

                <div
                    className={`cursor-pointer text-body-sm text-espresso mt-6 mb-10 text-center flex items-center justify-center gap-2 hover:gap-4 transition-all duration-300 ${loading ? "pointer-events-none opacity-50" : ""}`}
                    onClick={() => !loading && navigate("/login")}
                >
                    <HugeiconsIcon
                        icon={ArrowLeft02Icon}
                        size={16}
                        strokeWidth={1}
                    />
                    <p className="font-medium">Back to login</p>
                </div>
            </div>
        </div>
    )
}