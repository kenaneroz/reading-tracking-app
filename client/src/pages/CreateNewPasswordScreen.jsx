import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, ResetPasswordIcon } from "@hugeicons/core-free-icons"

import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"
import { useNavigate } from "react-router-dom"

export default function CreateNewPasswordScreen() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
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
                        <span>Reset password</span>
                    </Button>
                </div>

                <div
                    className="cursor-pointer text-body-sm text-espresso mt-6 mb-10 text-center flex items-center justify-center gap-2 hover:gap-4 transition-all duration-300"
                    onClick={() => navigate("/sign-in")}
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