import ProgressBar from "./ProgressBar"
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export default function ReadingActivityCard({ 
    readingActivity, 
    currentPage, 
    totalPages, 
    id, 
    setBooks, 
    deleteLatestReadingActivityService,
    updateLatestReadingActivityService
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPositionUpdatePopupActive, setIsPositionUpdatePopupActive] = useState(false)
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)

    const uniqueDays = new Set(
        readingActivity.map(activity => 
            new Date(activity.date).toDateString()
        )
    )
    const countReadingDays = uniqueDays.size

    let [newCurrentPage, setNewCurrentPage] = useState(currentPage)

    async function handleEdit() {
        try {
            const updatedBook = await updateLatestReadingActivityService(id, {
                currentPage: newCurrentPage,
            })

            setBooks(prev =>
                prev.map(book =>
                    book._id === id ? updatedBook : book
                )
            )

            setIsOpen(false)
            setIsPositionUpdatePopupActive(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function handleDelete() {
        try {
            const updatedBook = await deleteLatestReadingActivityService(id)

            setBooks(prev =>
                prev.map(book =>
                    book._id === id ? updatedBook : book
                )
            )

            setIsOpen(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="mt-4">
            {
                readingActivity.length === 0 ?
                <p className="text-taupe text-body-sm text-center">
                    You do not have any reading activities yet
                </p>
                :
                <>
                <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5">
                    {
                        readingActivity.slice().reverse().slice(0, 3).map((r, index) => (
                            index === 0
                                ? <div className={`flex items-center gap-4 ${(index + 1) === readingActivity.slice(0, 3).length ? "" : "border-b border-tan pb-4"} relative`} >
                                    <div className="shrink-0">
                                        <p className="text-espresso font-medium text-body-sm ">{new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                                        <p className="mt-1 text-taupe text-body-xs">{new Date(r.date).getFullYear()}</p>
                                    </div>
                                    <div className="flex-1"><ProgressBar currentPage={r.currentPage} totalPages={totalPages} /></div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-espresso font-medium  text-body-sm whitespace-nowrap">+{Number(r.currentPage) - Number(r.previousPage)} pages</p>
                                        <p className="text-taupe text-body-xs mt-1">p. {r.currentPage}</p>
                                    </div>
                                    <HugeiconsIcon
                                        icon={MoreVerticalIcon}
                                        size={20} 
                                        strokeWidth={1.25}
                                        className="text-espresso cursor-pointer"
                                        onClick={() => setIsOpen(prev => !prev)}
                                    />
                                    {isOpen &&
                                        <div 
                                            role="tablist"
                                            className="flex flex-col gap-3 absolute top-8 right-0 bg-beige rounded-2xl p-4 border border-tan"
                                        >
                                            <button
                                                type="button"
                                                role="tab"
                                                className="text-taupe cursor-pointer rounded-full text-body-sm text-left hover:text-espresso transition-all duration-300"
                                                onClick={() => {
                                                    setIsOpen(false)
                                                    setNewCurrentPage(currentPage)
                                                    setIsPositionUpdatePopupActive(true)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                role="tab"
                                                className="text-taupe cursor-pointer rounded-full text-body-sm text-left hover:text-espresso transition-all duration-300"
                                                onClick={() => {
                                                    setIsOpen(false)
                                                    setIsConfirmDeletePopupOpen(true)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    }
                                    {isConfirmDeletePopupOpen &&
                                        <ConfirmDeletePopup 
                                            cancel={() => setIsConfirmDeletePopupOpen(false)}
                                            delete_={() => {
                                                setIsConfirmDeletePopupOpen(false)
                                                handleDelete()
                                            }}
                                            message="This action cannot be undone."
                                        />
                                    }
                                    {isPositionUpdatePopupActive &&
                                        <div className="fixed bg-espresso/40 inset-0 z-50">
                                            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-1/2 -translate-y-1/2 md:max-w-[392px]">
                                                <button 
                                                    className="cursor-pointer"
                                                >
                                                    <HugeiconsIcon
                                                        icon={Cancel01Icon}
                                                        size={20}
                                                        strokeWidth={1.15}
                                                        onClick={() => setIsPositionUpdatePopupActive(false)}
                                                    />
                                                </button>

                                                <div className="mt-10">
                                                    <div>
                                                        <p className="h5 text-espresso">New current position</p>
                                                        <p className="mt-2 text-body-sm text-coffee">Currently on page {currentPage} of {totalPages}</p>
                                                    </div>

                                                    <div className="mt-6">
                                                        <NumberInput
                                                            min={0} 
                                                            max={totalPages}
                                                            placeholder="Enter your current position"
                                                            value={newCurrentPage}
                                                            onChange={(e) => setNewCurrentPage(Number(e.target.value))}
                                                            errorMessage=""
                                                        />
                                                    </div>

                                                    <div className="mt-8">
                                                        <PrimaryButton 
                                                            className="mt-8"
                                                            label="Update progress"
                                                            onClick={() => newCurrentPage === 0 ? handleDelete() : handleEdit()}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                : <div className={`flex items-center gap-4 ${(index + 1) === readingActivity.slice(0, 3).length ? "" : "border-b border-tan pb-4"}`} >
                                    <div className="shrink-0">
                                        <p className="text-espresso font-medium text-body-sm ">{new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                                        <p className="mt-1 text-taupe text-body-xs">{new Date(r.date).getFullYear()}</p>
                                    </div>
                                    <div className="flex-1"><ProgressBar currentPage={r.currentPage} totalPages={totalPages} /></div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-espresso font-medium  text-body-sm whitespace-nowrap">+{Number(r.currentPage) - Number(r.previousPage)} pages</p>
                                        <p className="text-taupe text-body-xs mt-1">p. {r.currentPage}</p>
                                    </div>
                                </div>
                        ))
                    }
                </div>
                <div className="bg-beige p-4 rounded-[14px] border border-tan flex gap-4 mt-4 items-center">
                    <div className="flex-1 text-center">
                        <p className="text-body-sm text-taupe">Reading days</p>
                        <p className="h5 text-espresso mt-1">{countReadingDays}</p>
                    </div>

                    <div className="w-px h-10 bg-tan"></div>

                    <div className="flex-1 text-center">
                        <p className="text-body-sm text-taupe">Avg. pages / day</p>
                        <p className="h5 text-espresso mt-1">{readingActivity.length === 0 ? "0" : Math.floor(Number(currentPage) / countReadingDays)}</p>
                    </div>
                </div>
                </>
            }

        </div>
    )
}