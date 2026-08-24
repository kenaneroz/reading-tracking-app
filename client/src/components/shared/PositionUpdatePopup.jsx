import { useEffect, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "./Modal"
import Input from "./form/Input"
import Button from "./Button"

import { useBooks } from "../../context/BookContext"

export default function PositionUpdatePopup({ id, currentPage, totalPages, setIsPositionUpdatePopupActive }) {
    const { setBooks, updateBook } = useBooks()
    const [newCurrentPage, setNewCurrentPage] = useState(currentPage)
    const [errors, setErrors] = useState({})

    function hidePopup() {
        setIsPositionUpdatePopupActive(false)
    }

    async function updatePosition() {
        if (currentPage === newCurrentPage) return

        try {
            setErrors({})   
            await updateBook(id, {
                currentPage: newCurrentPage
            })
            hidePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

    return (
        <>
            <button 
                className="cursor-pointer"
                onClick={hidePopup}
            >
                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={1.25}
                />
            </button>

            <div className="mt-10">
                <div>
                    <p className="h5 text-espresso">New current position</p>
                    <p className="mt-2 text-body-sm text-coffee">Currently on page {currentPage} of {totalPages}</p>
                </div>

                <div className="mt-6">
                    <Input
                        type="number"
                        min={0} 
                        max={totalPages}
                        placeholder="Enter your current position"
                        value={newCurrentPage}
                        errorMessage={errors.currentPage}
                        onChange={(e) => setNewCurrentPage(Number(e.target.value))}
                    />
                </div>

                <div className="mt-8">
                    <Button 
                        onClick={updatePosition}
                    >
                        <span>Update progress</span>
                    </Button>
                </div>
            </div>
        </>
    )
}