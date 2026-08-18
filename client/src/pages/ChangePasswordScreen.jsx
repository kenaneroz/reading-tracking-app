import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, ResetPasswordIcon } from "@hugeicons/core-free-icons"

import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"

export default function ChangePasswordScreen() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto">
            <div className="px-5 pt-5">
                <HugeiconsIcon 
                    icon={ArrowLeft02Icon} 
                    size={24} 
                    strokeWidth={1.5} 
                    className="cursor-pointer text-espresso"
                    onClick={() => navigate(-1)}
                />
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
                    <h1 className="h1 text-espresso">Change password</h1>
                    <p className="text-body-sm text-taupe mt-2">Enter your current password and choose a new one.</p>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-5">
                        <PasswordInput 
                            id="current-password"
                            label="Current password"
                            placeholder="Current password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData(prev => ({...prev, currentPassword: e.target.value}))}
                            errorMessage=""
                        />

                        <PasswordInput 
                            id="new-password"
                            label="New password"
                            placeholder="New password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
                            errorMessage=""
                        />

                        <PasswordInput 
                            id="confirm-new-password"
                            label="Confirm new password"
                            placeholder="Confirm new password"
                            value={formData.confirmNewPassword}
                            onChange={(e) => setFormData(prev => ({...prev, confirmNewPassword: e.target.value}))}
                            errorMessage=""
                        />
                    </div>

                    <Button
                        onClick=""
                        className="mt-7"
                    >
                        <span>Update password</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}