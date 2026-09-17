import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

export default function BottomSheet({ onClose, height, headerText, children }) {
    return (
        <div className="absolute inset-0 z-50 bg-espresso/40">
            {/* Close by backdrop click */}
            <div 
                className="absolute inset-0" 
                onClick={onClose} 
            />
            
            {/* Sheet body */}
            <div className={`absolute bottom-0 left-0 w-full ${height} rounded-t-[20px] bg-beige p-5 flex flex-col`}>
                {/* Header */}
                <div className="flex justify-between items-center">
                    <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={24}   
                        strokeWidth={1.5}
                        className="cursor-pointer text-taupe hover:text-espresso transition-all duration-300 ease-in-out"
                        onClick={onClose}
                    />
                    {headerText && <p className="text-body-sm text-taupe">{headerText}</p>}
                </div>

                {/* Content area */}
                <div className="flex flex-1 flex-col min-h-0">
                    {children}
                </div>
            </div>
        </div>
    )
}