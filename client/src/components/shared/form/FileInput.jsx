import { HugeiconsIcon } from "@hugeicons/react"
import { ImageAdd02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"

import ErrorMessage from "../ErrorMessage"

const variantStyles = {
    cover: "aspect-5/8 rounded-[10px]",
    profilePhoto: "aspect-1/1 rounded-full"
}

export default function FileInput({
    label,
    id,
    placeholder,
    errorMessage,
    onChange,
    variant = "cover",
    onRemove
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
                    ? <div className="py-2 h-full flex gap-2">
                        <div className="relative h-full">
                            <img
                                src={preview}
                                alt="Preview"
                                className={`h-full object-cover ${variantStyles[variant]}`}
                            />
                            <div 
                                className="h-5 w-5 bg-espresso/60 rounded-full absolute top-1 right-1 flex justify-center items-center cursor-pointer text-beige hover:bg-espresso transition-all duration-300 border border-beige" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPreview(null)
                                    onRemove()
                                }}
                            >
                                <HugeiconsIcon
                                    icon={Cancel01Icon}
                                    size={20}
                                    strokeWidth={1.25}
                                />
                            </div>
                        </div>
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