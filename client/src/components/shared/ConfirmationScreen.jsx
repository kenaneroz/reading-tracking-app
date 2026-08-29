import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon, Alert02Icon } from "@hugeicons/core-free-icons"

import Button from "./Button"

export default function ConfirmationScreen({
    iconVariant = "neutral",
    title,
    message,
    buttonText,
    onPrimaryClick,
    secondaryText,
    onSecondaryClick,
}) {

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col justify-center overflow-y-auto px-5">
            <div className="relative flex justify-center items-center">
                <img 
                    src={`${iconVariant === "success" ? "/success.svg" : "/neutral.svg"}`} 
                    alt="" 
                    className={`${iconVariant === "success" ? "opacity-20" : "opacity-100"} h-25 w-25`}
                /> 

                <HugeiconsIcon 
                    icon={iconVariant === "success" ? Tick02Icon : Alert02Icon} 
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
                onClick={onPrimaryClick}
                className="mt-8"
            >
                {buttonText}
            </Button>

            {secondaryText &&
                <span 
                    onClick={onSecondaryClick}
                    className="cursor-pointer text-body-sm font-medium text-espresso mt-4 text-center"
                >
                    {secondaryText}
                </span>
            }
        </div>
    )
}