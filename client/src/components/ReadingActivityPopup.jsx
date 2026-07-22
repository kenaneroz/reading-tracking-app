import ProgressBar from "./ProgressBar"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

export default function ReadingActivityPopup({ setIsReadingActivityPopupOpen, readingActivity, totalPages }) {
    return (
        <div className="fixed bg-espresso/40 inset-0 z-50">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-6 bottom-6 md:max-w-[392px] md:max-h-[908px] overflow-y-auto">

                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={24} 
                    strokeWidth={1.5}
                    className="text-espresso cursor-pointer"
                    onClick={() => setIsReadingActivityPopupOpen(false)}
                />
            
                <div className="mt-8">
                    <p className="h2 text-espresso">Reading activities</p>
                    <p className="text-body text-coffee mt-2">A log of all your reading sessions for this book.</p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    {
                        readingActivity.length === 0 ?
                        <p className="text-taupe text-body-sm">You do not have any reading activities yet</p>
                        :
                        readingActivity.slice().reverse().map((r, index) => (
                            <div className="flex items-center gap-4 bg-cream/60 px-6 py-2 rounded-2xl border border-tan/60">
                                <div className="shrink-0">
                                    <p className="text-espresso font-medium text-body-sm">{new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                                    <p className="text-body-xs text-taupe mt-1">{new Date(r.date).getFullYear()}</p>
                                </div>
                                <div className="flex-1"><ProgressBar currentPage={r.currentPage} totalPages={totalPages} /></div>
                                <div className="shrink-0 text-right">
                                    <p className="text-espresso font-medium text-body-sm whitespace-nowrap mt-1">{Number(r.currentPage) - Number(r.previousPage)} pages</p>
                                    <p className="text-taupe text-body-xs">p. {r.currentPage}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}