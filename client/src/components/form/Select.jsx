import ErrorMessage from "../shared/ErrorMessage"

export default function Select({
    label,
    id,
    errorMessage,
    value,
    onChange,
    options
}) {
    const inputBorder = errorMessage
        ? "border-red"
        : "border-tan focus:outline focus:outline-1 focus:outline-espresso"

    const textColor = value === ""
        ? "text-taupe"
        : "text-espresso"

    return (
        <div className="flex-1 w-full">
            {label &&
                <label
                    htmlFor={id}
                    className="text-espresso text-body-sm font-medium"
                >
                    {label}
                </label>
            }

            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className={`${inputBorder} ${textColor} h-15 mt-2 bg-beige/60 border px-4 rounded-[17px] outline-none appearance-none w-full`}
            >
                <option value="">
                    Select
                </option>

                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <ErrorMessage message={errorMessage} />
        </div>
    )
}