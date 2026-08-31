import { HugeiconsIcon } from "@hugeicons/react"
import { ImageAdd02Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"

import ErrorMessage from "../ErrorMessage"

export default function FileInput({
    label,
    id,
    placeholder,
    errorMessage,
    onChange,
    className
}) {
    const [preview, setPreview] = useState(null)

    const inputBorder = errorMessage
        ? "border-red"
        : "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso"

    function handleFileChange(e) {
        const file = e.target.files[0]

        if (!file) return

        setPreview(URL.createObjectURL(file))
        onChange(file)
    }

    return (
        <div>
            {label &&
                <p className="text-espresso text-body-sm font-medium">
                    {label}
                </p>
            }

            <label
                htmlFor={id}
                className={`${inputBorder} bg-beige border border-dashed rounded-[12px] px-4 h-30 flex flex-col justify-center items-center mt-2 cursor-pointer`}
            >
                <input
                    type="file"
                    id={id}
                    name={id}
                    accept=".png, .jpg, .jpeg, .webp"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {preview
                    ? <div className="py-2 h-full">
                        <img
                            src={preview}
                            alt="Preview"
                            className={`h-full object-cover ${className}`}
                        />
                    </div>
                    : <>
                        <HugeiconsIcon
                            icon={ImageAdd02Icon}
                            size={24}
                            strokeWidth={1.5}
                            className="text-taupe"
                        />

                        <p className="text-taupe text-body-sm mt-2">
                            {placeholder}
                        </p>
                    </>
                }
            </label>

            <ErrorMessage message={errorMessage} />
        </div>
    )
}