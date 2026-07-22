import { HugeiconsIcon } from "@hugeicons/react";

export default function Textarea({ label, id, placeholder, errorMessage, value, onChange }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="text-espresso text-body-sm font-medium">
                    {label}
                </label>
            )}

            <div className={`${!errorMessage || errorMessage === "" ? "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso" : "border-red-600"} w-full flex items-center gap-4 mt-2 bg-beige/60 border px-4 py-2 rounded-[17px]`}>               
                <textarea 
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    rows={6}
                    onChange={onChange}
                    className="w-full h-full text-espresso text-body outline-none resize-none"
                />
            </div>

            {errorMessage !== "" &&
                <p className="text-red-600 text-body-sm mt-1">{errorMessage}</p>
            }        
        </div>
    );
}