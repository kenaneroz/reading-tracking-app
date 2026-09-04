import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ResetPasswordIcon } from "@hugeicons/core-free-icons"

import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"

import { useAuth } from "../context/authContext"
import BackButton from "../components/shared/BackButton"

import validateNewPassword from "../utils/validators/validateNewPassword.js"

export default function ChangePasswordScreen() {
    const { logout, updatePassword } = useAuth()
    
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    
    const hasChanges = 
        formData.currentPassword.trim() !== "" &&
        formData.newPassword.trim() !== "" &&
        formData.confirmNewPassword.trim() !== ""

    const [isUpdating, setIsUpdating] = useState(false)
    
    const [errors, setErrors] = useState({})
    
    const navigate = useNavigate()

    async function handleUpdate() {
        if (!hasChanges) return
        
        try {
            setIsUpdating(true)
            setErrors({})
            
            const validationErrors = validateNewPassword(formData)
            const hasErrors = Object.keys(validationErrors).length > 0
            
            if (hasErrors) {
                setErrors(validationErrors)
                return
            }
            
            const token = localStorage.getItem("token")
            await updatePassword(token, formData)

            navigate("/edit-profile/change-password/success")
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-5 pt-5">
                <BackButton disabled={isUpdating} />
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
                            errorMessage={errors.currentPassword}
                        />

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
                        onClick={handleUpdate}
                        className="mt-7"
                        disabled={!hasChanges || isUpdating}
                    >
                        <span>Update password</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}