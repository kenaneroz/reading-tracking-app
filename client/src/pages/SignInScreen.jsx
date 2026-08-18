import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"

import Input from "../components/shared/form/Input"
import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"
import HorizontalDivider from "../components/shared/HorizontalDivider"
import { useNavigate } from "react-router-dom"

export default function SignInScreen() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            <div className="mt-8 px-5">
                <div className="text-center">
                    <h1 className="h1 text-espresso">Welcome back!</h1>
                    <p className="text-body-sm text-taupe mt-2">Sign in to continue your tracking journey.</p>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-5">
                        <Input 
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            errorMessage=""
                        />

                        <div>
                            <PasswordInput 
                                id="password"
                                label="Password"
                                placeholder="Your password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                                errorMessage=""
                            />

                            <p 
                                className="cursor-pointer text-body-sm text-taupe text-right mt-2 hover:text-espresso transition-all duration-300"
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot password
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick=""
                        className="mt-6"
                    >
                        <span>Sign in</span>
                    </Button>
                </div>


                <div className="flex items-center gap-3 mt-6">
                    <HorizontalDivider className="flex-1" />
                    <span className="shrink-0 whitespace-nowrap text-body-xs text-taupe">
                        Or continue with
                    </span>
                    <HorizontalDivider className="flex-1" />
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        variant="outline"
                        onClick=""
                    >
                        <img src="/google-icon-logo.svg" alt="" className="h-5 w-5" />
                        <span>Continue with Google</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick=""
                    >
                        <img src="/apple-icon-logo.svg" alt="" className="h-5 w-5" />
                        <span>Continue with Apple</span>
                    </Button>

                </div>

                <p className="text-body-sm text-taupe mt-8 mb-10 text-center">
                    New to Bookly? <span 
                        className="cursor-pointer text-espresso font-semibold"
                        onClick={() => navigate("/sign-up")}
                    > 
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    )
}