import { HugeiconsIcon } from "@hugeicons/react";

export default function TextInput({ label, id, placeholder, icon, errorMessage, value, onChange }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="text-espresso text-body-sm font-medium">
                    {label}
                </label>
            )}

            <div className={`${!errorMessage || errorMessage === "" ? "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso" : "border-red-600"} w-full h-15 flex items-center gap-4 mt-2 bg-beige/60 border px-4 rounded-[17px]`}>               
                <input 
                    type="text" 
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full h-full text-espresso text-body outline-none"
                />
                {icon && (
                    <HugeiconsIcon icon={icon} size={20} strokeWidth={1.15} className="text-taupe" />
                )}
            </div>

            {errorMessage !== "" &&
                <p className="text-red-600 text-body-sm mt-1">{errorMessage}</p>
            }        
        </div>
    );
}