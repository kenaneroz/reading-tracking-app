import { useRef, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, MailEdit01Icon } from "@hugeicons/core-free-icons"

import Input from "../components/shared/form/Input"
import Button from "../components/shared/Button"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/authContext"

export default function ChangeEmailAddressScreen() {
    const { user, updateAccountDetails, logout } = useAuth()
    
    const initialData = useRef({
        email: user.email
    })
    const [formData, setFormData] = useState({
        email: user.email
    })
    const hasChanges = Object.keys(initialData.current).some(key => formData[key] !== initialData.current[key])

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    async function handleUpdate() {
        if (!hasChanges) return

        const token = localStorage.getItem("token")

        try {
            await updateAccountDetails(token, formData)
            logout()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

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
                        icon={MailEdit01Icon} 
                        size={40} 
                        strokeWidth={1.5} 
                        className="text-espresso absolute"
                    />                    
                </div>

                <div className="mt-6 text-center">
                    <h1 className="h1 text-espresso">Change email address</h1>
                    <p className="text-body-sm text-taupe mt-2">Enter a new email address.</p>
                </div>

                <div className="mt-8">
                    <Input 
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        errorMessage=""
                    />

                    <Button
                        onClick={handleUpdate}
                        className="mt-5"
                        disabled={!hasChanges}
                    >
                        <span>Update email</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}