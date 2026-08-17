import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon } from "@hugeicons/core-free-icons"

import ErrorMessage from "../ErrorMessage"
import { useState } from "react"

export default function PasswordInput({
    label,
    id,
    placeholder,
    errorMessage,
    value,
    onChange,
    onClick
}) {
    const [showPassword, setShowPassword] = useState(false)

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
                    type={showPassword ? "text" : "password"}
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full h-full text-espresso text-body outline-none"
                />

                <HugeiconsIcon
                    icon={ViewIcon}
                    size={20}
                    strokeWidth={1.15}
                    className="cursor-pointer text-taupe"
                    onClick={() => setShowPassword(prev => !prev)}
                />
            </div>

            <ErrorMessage message={errorMessage} />
        </div>
    )
}