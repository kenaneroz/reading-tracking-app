export default function NumberInput({ label, id, placeholder, errorMessage, value, onChange, min, max }) {


    return (
        <div>
            {label && (
                <label htmlFor={id} className="text-espresso text-body-sm font-medium">
                    {label}
                </label>
            )}

            <div className={`${!errorMessage || errorMessage === "" ? "border-tan focus-within:outline focus-within:outline-1 focus-within:outline-espresso" : "border-red-600"} w-full h-15 flex items-center gap-4 mt-2 bg-beige/60 border px-4 rounded-[17px]`}>
                <input 
                    type="number" 
                    id={id}
                    name={id}
                    value={value}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={1}
                    onKeyDown={(e) => ["e", "E", "-", "+", "."].includes(e.key) && e.preventDefault()}
                    onChange={onChange}
                    className="w-full h-full text-espresso text-body outline-none"
                />
            </div>

            {errorMessage !== "" &&
                <p className="text-red-600 text-body-sm mt-1">{errorMessage}</p>
            }
        </div>
    );
}