import { HugeiconsIcon } from "@hugeicons/react"

export default function SummaryCard({ label, icon, value, caption }) {
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-body-sm text-taupe">{label}</p>

                <div className="w-9 h-9 bg-tan rounded-full flex items-center justify-center">
                    <HugeiconsIcon
                        icon={icon}
                        size={20}
                        strokeWidth={1.25}
                        className="text-coffee"
                    />   
                </div>
            </div>
            
            <div className="mt-1">
                <p className="text-espresso h2">{value}</p>

                <p className="text-body-xs text-taupe mt-1">{caption}</p>
            </div>
        </>
    )
}