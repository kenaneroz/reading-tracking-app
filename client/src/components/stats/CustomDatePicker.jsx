import { useEffect } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

export default function CustomDatePicker({ customDateRange, setCustomDateRange, setIsOpen, setIsCustomDatePickerOpen, setActiveDateFilter }) {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [])


    const startDate = customDateRange.startDate
        ? new Date(customDateRange.startDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Choose start date"

    const endDate = customDateRange.endDate
        ? new Date(customDateRange.endDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Choose end date"

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="border-l border-tan pl-5">
            <div className="flex justify-between items-center">
                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={1.25}
                    className="cursor-pointer text-taupe hover:text-espresso transition-all duration-300"
                    onClick={() => {
                        setIsOpen(false)
    
                        if (customDateRange.startDate === "" && customDateRange.endDate === "") {
                            setActiveDateFilter("All time")
                            setIsCustomDatePickerOpen(false)
                        }
                    }}
                /> 

                <button
                    onClick={() => setCustomDateRange({ startDate: "", endDate: "" })}
                    className="cursor-pointer text-body-sm border border-tan text-taupe px-3 h-7 rounded-full hover:text-coffee transition-all duration-300"
                >Clear</button>
            </div>

            <div className="relative mt-5 w-44 h-12"
                onClick={(e) => e.currentTarget.querySelector("input").showPicker()}
            >
                <input
                    id="start-date"
                    type="date"
                    value={customDateRange.startDate}
                    max={customDateRange.endDate || today}
                    onChange={(e) =>
                        setCustomDateRange((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                        }))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 peer"
                />

                <label
                    htmlFor="start-date"
                    className="cursor-pointer border border-tan rounded-xl text-body-sm flex items-center text-coffee px-4 h-full cursor-pointer peer-focus:border-espresso transition-all duration-300"
                >
                    {startDate}
                </label>
            </div>

            <div className="relative mt-2 w-44 h-12"
                onClick={(e) => e.currentTarget.querySelector("input").showPicker()}
            >
                <input
                    id="end-date"
                    type="date"
                    value={customDateRange.endDate}
                    min={customDateRange.startDate || ""}
                    max={today}
                    onChange={(e) => {
                        setCustomDateRange((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                        }))
                    }}
                    className="peer absolute inset-0 w-full h-full opacity-0"
                />

                <label
                    htmlFor="end-date"
                    className="cursor-pointer border border-tan rounded-xl text-body-sm flex items-center text-coffee px-4 h-full cursor-pointer peer-focus:border-espresso transition-all duration-300"
                >
                    {endDate}
                </label>
            </div>
        </div>
    )
}