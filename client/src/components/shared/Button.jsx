import { twMerge } from "tailwind-merge"
import Spinner from "./Spinner"

export default function Button({
    variant = "primary",
    onClick,
    children,
    icon,
    disabled = false,
    loading = false,
    fullWidth = true,
    type = "button",
    className = ""
}) {
    const variants = {
        primary: "bg-espresso text-cream hover:bg-espresso/90",
        secondary: "bg-taupe text-cream hover:bg-taupe/90",
        outline: "bg-transparent text-espresso border border-tan hover:bg-tan/40",
        dashed: "bg-transparent text-espresso border border-dashed border-tan hover:bg-tan/40",
        danger: "bg-red text-cream hover:bg-red/90",
        text: "bg-transparent text-espresso hover:bg-tan/30"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={twMerge(
                `h-13 rounded-full flex items-center justify-center gap-2 font-medium transition-all duration-300
                ${fullWidth ? "w-full" : "w-fit px-6"}
                ${variants[variant]}
                ${(disabled || loading) ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`,
                className
            )}
        >
            {loading ? <Spinner /> : icon}
            {children}
        </button>
    )
}