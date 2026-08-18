import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, MailEdit01Icon } from "@hugeicons/core-free-icons"

import Input from "../components/shared/form/Input"
import Button from "../components/shared/Button"
import { useNavigate } from "react-router-dom"

export default function ChangeEmailAddressScreen() {
    const [formData, setFormData] = useState({
        email: ""
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
                        icon={MailEdit01Icon} 
                        size={40} 
                        strokeWidth={1.5} 
                        className="text-espresso absolute"
                    />                    
                </div>

                <div className="mt-6 text-center">
                    <h1 className="h1 text-espresso">Change email address</h1>
                    <p className="text-body-sm text-taupe mt-2">Enter a new email address. We'll send a confirmation link to verify the change.</p>
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
                        onClick=""
                        className="mt-5"
                    >
                        <span>Send confirmation link</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}