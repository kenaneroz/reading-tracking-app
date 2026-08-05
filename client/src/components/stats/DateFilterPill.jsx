import { useState, useEffect } from "react"

import CustomDatePicker from "./CustomDatePicker"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

export default function DateFilterPill({ activeDateFilter, setActiveDateFilter, customDateRange, setCustomDateRange }) {
    const options = ["All time", "This year", "This month", "Custom"]
    const [isOpen, setIsOpen] = useState(false)
    const [isCustomDatePickerOpen, setIsCustomDatePickerOpen] = useState(false)

    return (
        <div className="relative">
            <button className="cursor-pointer w-fit h-9 px-[14px] bg-beige flex items-center gap-[6px] border border-tan rounded-[18px]"
                onClick={() => {
                    setIsOpen(prev => {
                        if (prev) {
                            if (
                                activeDateFilter === "Custom" &&
                                (!customDateRange.startDate && !customDateRange.endDate)
                            ) {
                                setActiveDateFilter("All time")
                                setIsCustomDatePickerOpen(false)
                            }
                        } 

                        return !prev
                    })
                }}
            >
                <span className="text-coffee text-body-sm">{activeDateFilter}</span>
                
                <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={12}
                    strokeWidth={0.75}
                    className={`text-taupe ${isOpen ? "rotate-180" : ""} transition-all duration-300`}
                />            
            </button>

            { isOpen && 
                <div className="bg-beige absolute top-11 left-0 z-50 flex gap-2 p-5 rounded-[20px] border border-tan">
                    <div 
                        role="tablist"
                        className="flex flex-col gap-3 pr-5"
                    >
                        {
                            options.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    role="tab"
                                    aria-selected=""
                                    onClick={() => {
                                        setActiveDateFilter(option)

                                        if (option === "Custom") {
                                            setIsCustomDatePickerOpen(true)
                                        } else {
                                            setCustomDateRange({startDate: "", endDate: ""})
                                            setIsCustomDatePickerOpen(false)
                                            setIsOpen(false)
                                        }
                                    }}
                                    className={`${activeDateFilter === option ? 'text-espresso font-medium' : 'text-taupe'} cursor-pointer rounded-full text-body-sm text-left hover:text-espresso transition-all duration-300`}
                                >
                                    {option}
                                </button>
                            ))
                        }
                    </div>  
                    { isCustomDatePickerOpen &&
                        <CustomDatePicker
                            customDateRange={customDateRange}
                            setCustomDateRange={setCustomDateRange}
                            setIsOpen={setIsOpen}
                            setIsCustomDatePickerOpen={setIsCustomDatePickerOpen}
                            setActiveDateFilter={setActiveDateFilter}
                        />
                    }   
                </div>
            }
        </div>
    )
}