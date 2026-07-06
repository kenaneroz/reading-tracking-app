export default function NumberInput({ label, id, errorMessage, value, onChange, options}) {
    return (
        <div className="flex-1 w-full">
            {label && (
                <label htmlFor={id} className="text-espresso text-body-sm font-medium">
                    {label}
                </label>
            )}

            <select 
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className={`h-15 flex items-center gap-4 mt-2 bg-beige/60 border border-tan px-4 rounded-[17px] outline-none focus:outline focus:outline-1 focus:outline-espresso appearance-none w-full ${value === "" ? "text-taupe" : "text-espresso"}`}
            >
                <option 
                    value=""
                >Select</option>
                {
                    options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>

            {errorMessage !== "" &&
                <p className="text-red-600 text-body-sm mt-1">{errorMessage}</p>
            }
        </div>
    );
}