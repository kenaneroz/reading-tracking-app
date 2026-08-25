import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalIcon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal.jsx"
import ProgressBar from "../shared/ProgressBar.jsx"
import ConfirmDeletePopup from "../shared/ConfirmDeletePopup.jsx"
import PositionUpdatePopup from "../shared/PositionUpdatePopup.jsx"
import HorizontalDivider from "../shared/HorizontalDivider.jsx"

import { useBooks } from "../../context/BookContext"

export default function ReadingActivityCard({ book }) {
    const { deleteReadingActivity } = useBooks()
    const [isOpen, setIsOpen] = useState(false)
    const [isPositionUpdatePopupActive, setIsPositionUpdatePopupActive] = useState(false)
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)

    const uniqueDays = new Set(
        book.readingActivity.map(activity => 
            new Date(activity.date).toDateString()
        )
    )
    const countReadingDays = uniqueDays.size

    const recentActivities = book.readingActivity.slice().reverse().slice(0, 3)
    async function handleDelete() {
        try {
            await deleteReadingActivity(book._id)
            setIsOpen(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="mt-4">
            {book.readingActivity.length === 0 ? (
                <p className="text-taupe text-body-sm text-center">
                    You do not have any reading activities yet
                </p>
            ) : (
                <>
                    <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-4">
                        {recentActivities.map((r, index) => {
                            const isFirst = index === 0
                            const isLast = index === recentActivities.length - 1

                            return (
                                <div key={r._id || index} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 relative">
                                        <div className="shrink-0">
                                            <p className="text-espresso font-medium text-body-sm">
                                                {new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                                            </p>
                                            <p className="mt-1 text-taupe text-body-xs">
                                                {new Date(r.date).getFullYear()}
                                            </p>
                                        </div>

                                        <div className="flex-1">
                                            <ProgressBar currentPage={r.currentPage} totalPages={book.totalPages} />
                                        </div>

                                        <div className="shrink-0 text-right">
                                            <p className="text-espresso font-medium text-body-sm whitespace-nowrap">
                                                +{Number(r.currentPage) - Number(r.previousPage)} pages
                                            </p>
                                            <p className="text-taupe text-body-xs mt-1">p. {r.currentPage}</p>
                                        </div>

                                        {isFirst && (
                                            <>
                                                <HugeiconsIcon
                                                    icon={MoreVerticalIcon}
                                                    size={20} 
                                                    strokeWidth={1.25}
                                                    className="text-espresso cursor-pointer"
                                                    onClick={() => setIsOpen(prev => !prev)}
                                                />

                                                {isOpen && (
                                                    <div 
                                                        role="tablist"
                                                        className="flex flex-col gap-3 absolute top-8 right-0 bg-beige rounded-2xl p-4 border border-tan z-10 shadow-sm"
                                                    >
                                                        <button
                                                            type="button"
                                                            role="tab"
                                                            className="text-taupe cursor-pointer rounded-full text-body-sm text-left hover:text-espresso transition-all duration-300"
                                                            onClick={() => {
                                                                setIsOpen(false)
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
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {!isLast && <HorizontalDivider />}
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-beige p-4 rounded-[14px] border border-tan flex gap-4 mt-4 items-center">
                        <div className="flex-1 text-center">
                            <p className="text-body-sm text-taupe">Reading days</p>
                            <p className="h5 text-espresso mt-1">{countReadingDays}</p>
                        </div>

                        <div className="w-px h-10 bg-tan"></div>

                        <div className="flex-1 text-center">
                            <p className="text-body-sm text-taupe">Avg. pages / day</p>
                            <p className="h5 text-espresso mt-1">
                                {countReadingDays > 0 ? Math.floor(Number(book.currentPage) / countReadingDays) : 0}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {isConfirmDeletePopupOpen && (
                <ConfirmDeletePopup 
                    cancel={() => setIsConfirmDeletePopupOpen(false)}
                    delete_={() => {
                        setIsConfirmDeletePopupOpen(false)
                        handleDelete()
                    }}
                    message="This action cannot be undone."
                />
            )}

            {isPositionUpdatePopupActive && (
                <Modal>
                    <PositionUpdatePopup 
                        book={book}
                        setIsPositionUpdatePopupActive={setIsPositionUpdatePopupActive}
                    />
                </Modal>
            )}
        </div>
    )
}