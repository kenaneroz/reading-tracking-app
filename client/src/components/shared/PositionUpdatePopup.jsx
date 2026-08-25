import { useRef, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Input from "./form/Input"
import Button from "./Button"

import { useBooks } from "../../context/BookContext"
import validateUpdateBook from "../../utils/validators/validateUpdateBook.js"

export default function PositionUpdatePopup({ book, setIsPositionUpdatePopupActive }) {
    const { updateBook } = useBooks()
    const initialCurrentPage = useRef(book.currentPage ?? 0)
    
    const [formData, setFormData] = useState({
        currentPage: book.currentPage ?? 0
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    function hidePopup() {
        setIsPositionUpdatePopupActive(false)
    }
    
    const hasChanges = formData.currentPage !== "" && Number(formData.currentPage) !== Number(initialCurrentPage.current)
    
    const validationErrors = validateUpdateBook(formData, book)
    const hasErrors = Object.keys(validationErrors).length > 0

    async function updatePosition() {
        if (!hasChanges || isLoading) return
        
        if (hasErrors) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {   
            await updateBook(book._id, {
                currentPage: Number(formData.currentPage)
            })
            hidePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setIsLoading(false)
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
                    <p className="mt-2 text-body-sm text-coffee">
                        Currently on page {book.currentPage ?? 0} of {book.totalPages}
                    </p>
                </div>

                <div className="mt-6">
                    <Input
                        type="number"
                        min={0} 
                        max={book.totalPages}
                        placeholder="Enter your current position"
                        value={formData.currentPage}
                        errorMessage={errors.currentPage}
                        onChange={(e) => {
                            const val = e.target.value
                            setFormData({ currentPage: val === "" ? "" : Number(val) })
                        }}
                    />
                </div>

                <div className="mt-8">
                    <Button 
                        onClick={updatePosition}
                        disabled={!hasChanges || isLoading}
                    >
                        <span>{isLoading ? "Updating..." : "Update progress"}</span>
                    </Button>
                </div>
            </div>
        </>
    )
}