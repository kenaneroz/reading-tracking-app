import { HugeiconsIcon } from "@hugeicons/react";
import { ImageAdd02Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";

export default function FileInput({ label, id, placeholder, errorMessage, onChange}) {
    const [preview, setPreview] = useState(null)

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return 
        setPreview(URL.createObjectURL(file))
        onChange(file)
    }

    return (
        <div>
            {label && 
                <p className="text-espresso text-body-sm font-medium">{label}</p>
            }

            <label 
                htmlFor={id}
                className={`${!errorMessage || errorMessage === "" ? "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso" : "border-red-600"} border border-tan border-dashed rounded-[17px] px-4 h-[140px] flex flex-col justify-center items-center mt-2 cursor-pointer`}
            >
                <input 
                    type="file" 
                    id={id}
                    name={id}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                { preview ?
                    <div className="py-2 h-full">
                        <img src={preview} alt="Preview" className="h-full aspect-5/8 object-cover rounded-[10px]" />
                    </div>
                    :
                    <>
                        <HugeiconsIcon icon={ImageAdd02Icon} size={24} strokeWidth={1.5} />                   
                        <p className="text-coffee text-body-sm mt-2">{placeholder}</p>
                    </>

                }
            </label>

            {errorMessage !== "" &&
                <p className="text-red-600 text-body-sm mt-1">{errorMessage}</p>
            }    
        </div>
    )
}