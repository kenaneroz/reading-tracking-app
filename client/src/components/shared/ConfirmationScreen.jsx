import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ResetPasswordIcon } from "@hugeicons/core-free-icons"


import Button from "./Button"

export default function ConfirmationScreen({
    icon,
    iconVariant = "neutral",
    title,
    message,
    buttonText,
    buttonDestination,
    secondaryText,
    onSecondaryClick,
}) {
    const navigate = useNavigate()

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col justify-center overflow-y-auto px-5">
            <div className="relative flex justify-center items-center">
                <img 
                    src={`${iconVariant === "success" ? "/success.svg" : "/neutral.svg"}`} 
                    alt="" 
                    className={`${iconVariant === "success" ? "opacity-20" : "opacity-100"} h-25 w-25`}
                /> 

                <HugeiconsIcon 
                    icon={icon} 
                    size={40} 
                    strokeWidth={1.5} 
                    className="text-espresso absolute"
                />                    
            </div>

            <div className="mt-6 text-center">
                <h1 className="h1 text-espresso">{title}</h1>
                <p className="text-body-sm text-taupe mt-2">{message}</p>
            </div>

            <Button 
                onClick={() => navigate(buttonDestination)}
                className="mt-8"
            >
                {buttonText}
            </Button>

            {secondaryText &&
                <span 
                    onClick={onSecondaryClick}
                    className="text-body-sm font-medium text-espresso mt-4 text-center"
                >
                    {secondaryText}
                </span>
            }
        </div>
    )
}