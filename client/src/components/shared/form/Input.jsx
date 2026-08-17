import { HugeiconsIcon } from "@hugeicons/react"
import ErrorMessage from "../ErrorMessage"

export default function Input({
    type = "text",
    label,
    id,
    placeholder,
    icon,
    errorMessage,
    value,
    onChange,
    min,
    max
}) {
    const inputBorder = errorMessage
        ? "border-red"
        : "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso"

    return (
        <div>
            {label &&
                <label htmlFor={id} className="text-espresso text-body-sm font-medium">
                    {label}
                </label>
            }

            <div className={`${inputBorder} w-full h-13 flex items-center gap-4 mt-2 bg-beige border px-4 rounded-xl`}>
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    min={min}
                    max={max}
                    className="w-full h-full text-espresso text-body outline-none"
                />

                {icon &&
                    <HugeiconsIcon
                        icon={icon}
                        size={20}
                        strokeWidth={1.15}
                        className="text-taupe"
                    />
                }
            </div>

            <ErrorMessage message={errorMessage} />
        </div>
    )
}