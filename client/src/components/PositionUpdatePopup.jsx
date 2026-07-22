import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";

export default function PositionUpdatePopup({ id, currentPage, totalPages, setIsPositionUpdatePopupActive, setBooks, updateBook }) {
    const [newCurrentPage, setNewCurrentPage] = useState(currentPage)

    function hidePositionUpdatePopup() {
        setIsPositionUpdatePopupActive(false)
    }

    async function updatePosition() {
        const updatedBook = await updateBook(id, { currentPage: newCurrentPage })

        setBooks(prev => (
            prev.map(book =>
                book._id === id 
                ? {
                    ...updatedBook,
                    status: newCurrentPage === 0
                    ? "Wishlist"
                    : newCurrentPage === book.totalPages
                        ? "Finished"
                        : "Reading"
                }
                : book
            )
        ))

        hidePositionUpdatePopup()
    }


    return (
        <div className="fixed bg-espresso/40 inset-0 z-50">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-1/2 -translate-y-1/2 md:max-w-[392px]">
                <button 
                    className="cursor-pointer"
                    onClick={hidePositionUpdatePopup}
                >
                    <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={20}
                        strokeWidth={1.15}
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
                            errorMessage=""
                            onChange={(e) => setNewCurrentPage(Number(e.target.value))}
                        />
                    </div>

                    <div className="mt-8">
                        <PrimaryButton 
                            className="mt-8"
                            onClick={updatePosition}
                            label="Update progress"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}