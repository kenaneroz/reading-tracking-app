import { useState } from "react"

import Input from "../components/shared/form/Input"
import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"
import HorizontalDivider from "../components/shared/HorizontalDivider"
import BackButton from "../components/shared/BackButton"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/authContext"
import { useGoogleLogin } from "@react-oauth/google"
import ErrorMessage from "../components/shared/ErrorMessage"
import validateLogin from "../utils/validators/validateLogin"

export default function LoginScreen() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const { login, googleAuth } = useAuth()
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        setErrors({})

        const validationErrors = validateLogin(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsLoggingIn(true)

        try {
            await login(formData)
            navigate("/home")
        } catch (error) {
            if (error.statusCode === 500 || error.statusCode === 0) {
                setErrors({ general: error.message })
            } else {
                setErrors(error.errors || {})
            }
            console.log(error)
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleCustomGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoggingIn(true)
            setErrors({})

            try {
                await googleAuth(tokenResponse.access_token)
                navigate("/home")
            } catch (error) {
                console.error("Google login error:", error)
                setErrors(error.errors || { general: "Unable to sign with Google" })
            } finally {
                setIsLoggingIn(false)
            }
        }, onError: (error) => {
            console.error("Google window error:", error)
        }
    })

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-5 pt-5">
                <BackButton disabled={isLoggingIn} />
            </div>

            <div className="mt-8 px-5">
                <div className="text-center">
                    <h1 className="h1 text-espresso">Welcome back!</h1>
                    <p className="text-body-sm text-taupe mt-2">Log in to continue your tracking journey.</p>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-5">
                        <Input
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            errorMessage={errors.email}
                        />

                        <div>
                            <PasswordInput
                                id="password"
                                label="Password"
                                placeholder="Your password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                errorMessage={errors.password}
                            />

                            <p
                                className="cursor-pointer text-body-sm text-taupe text-right mt-2 hover:text-espresso transition-all duration-300"
                                onClick={() => !isLoggingIn && navigate("/forgot-password")}
                            >
                                Forgot password?
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleLogin}
                        className="mt-6"
                        disabled={isLoggingIn}
                    >
                        <span>{isLoggingIn ? "Logging in..." : "Log in"}</span>
                    </Button>

                    {errors.general &&
                        <ErrorMessage message={errors.general} />
                    }
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
                        disabled={isLoggingIn}
                        onClick={() => handleCustomGoogleLogin()}
                    >
                        <img src="/google-icon-logo.svg" alt="" className="h-5 w-5" />
                        <span>Continue with Google</span>
                    </Button>
                </div>

                <p className="text-body-sm text-taupe mt-8 mb-10 text-center">
                    New to Bookly? <span
                        className="cursor-pointer text-espresso font-semibold"
                        onClick={() => !isLoggingIn && navigate("/register")}
                    >
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    )
}