import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"

import Input from "../components/shared/form/Input"
import PasswordInput from "../components/shared/form/PasswordInput"
import Button from "../components/shared/Button"
import HorizontalDivider from "../components/shared/HorizontalDivider"
import BackButton from "../components/shared/BackButton"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/authContext"

export default function RegisterScreen() {
    const { register } = useAuth() 
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [isRegistering, setIsRegistering] = useState(false)

    const navigate = useNavigate()

    async function handleRegister(e) {
        setIsRegistering(true)
        setErrors({})
        e.preventDefault()

        try {
            await register(formData)
        } catch (error) {
           setErrors(error.errors || {})
           console.log(error)
        } finally {
            setIsRegistering(false)
        }
    }

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="px-5 pt-5">
                <BackButton disabled={isRegistering} />
            </div>

            <div className="mt-8 px-5">
                <div className="text-center">
                    <h1 className="h1 text-espresso">Start tracking</h1>
                    <p className="text-body-sm text-taupe mt-2">Track your books, see your stats, build the habit.</p>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <Input 
                                id="name"
                                label="Name"
                                placeholder="Ellison"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                errorMessage={errors.name}
                            />

                            <Input 
                                id="surname"
                                label="Surname"
                                placeholder="Elliot"
                                value={formData.surname}
                                onChange={(e) => setFormData(prev => ({...prev, surname: e.target.value}))}
                                errorMessage={errors.surname}
                            />
                        </div>

                        <Input 
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            errorMessage={errors.email}
                        />

                        <PasswordInput 
                            id="password"
                            label="Password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                            errorMessage={errors.password}
                        />

                    </div>

                    <Button
                        onClick={handleRegister}
                        className="mt-7"
                        disabled={isRegistering}
                    >
                        <span>{isRegistering ? "Registering..." : "Register"}</span>
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
                    Already have an account?  <span 
                        className="cursor-pointer text-espresso font-semibold"
                        onClick={() => navigate("/login")}
                    > 
                        Log in
                    </span>
                </p>
            </div>
        </div>
    )
}