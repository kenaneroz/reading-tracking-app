import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { LibrariesIcon } from "@hugeicons/core-free-icons"

import Button from "../components/shared/Button"

export default function StartScreen() {
    const navigate = useNavigate()

    return (
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="relative w-full flex-1 min-h-0">
                <img src="/background-2.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream"></div>

                <h1 className="h1 text-espresso absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Bookly</h1>
            </div>

            <div className="w-full h-fit flex flex-col items-center text-center px-5 mt-6 mb-10 shrink-0">
                <HugeiconsIcon 
                    icon={LibrariesIcon} 
                    size={40} 
                    strokeWidth={1.75} 
                    className="text-espresso"
                />

                <h2 className="h1 text-espresso mt-6">Track every book, build a habit that sticks.</h2>

                <p className="text-body text-coffee mt-4">See your progress at a glance, celebrate your streaks, and keep the momentum going.</p>

                <Button
                    className="mt-8"
                    onClick={() => navigate("/register")}
                >
                    <span>Get started</span>
                </Button>

                <p className="text-body-sm text-taupe mt-4">
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