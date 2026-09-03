import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"

export default function BackButton({ disabled, background = "light" }) {
    const navigate = useNavigate()

    return (
        <button 
            disabled={disabled}
        >
            <HugeiconsIcon 
                icon={ArrowLeft02Icon} 
                size={24} 
                strokeWidth={1.5} 
                className={` ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
                    ${background === "light" ? "text-taupe hover:text-espresso" : "text-cream/80 hover:text-cream"} `}
                onClick={() => navigate(-1)}
            />

        </button>
    )
}