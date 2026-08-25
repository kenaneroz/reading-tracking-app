import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal"
import Textarea from "../shared/form/Textarea"
import Input from "../shared/form/Input"
import Button from "../shared/Button"

import { useBooks } from "../../context/BookContext"
import validateAddNote from "../../utils/validators/validateAddNote.js"

export default function AddNote({ book, closeAddNotePopup }) {
    const { addNote } = useBooks()

    const [formData, setFormData] = useState({
        content: "",
        page: null
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const validationErrors = validateAddNote(formData, book)
    const hasErrors = Object.keys(validationErrors).length > 0
    const hasChanges = formData.content.trim() !== ""

    async function handleAddNote() {
        if (!hasChanges || isLoading) return
        if (hasErrors) {
            setErrors(validationErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            await addNote(book._id, {
                content: formData.content.trim(),
                page: formData.page
            })
            closeAddNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal>
            <HugeiconsIcon 
                icon={Cancel01Icon} 
                size={24} 
                strokeWidth={1.5} 
                className="cursor-pointer text-espresso" 
                onClick={closeAddNotePopup} 
            />
            
            <div className="mt-8">
                <Textarea 
                    id="note-content" 
                    label="Content" 
                    placeholder="Content" 
                    errorMessage={errors.content}
                    value={formData.content} 
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} 
                />
            </div>

            <div className="mt-4">
                <Input
                    type="number"
                    id="note-page"
                    label="Page number" 
                    placeholder="Page number" 
                    min={0}
                    max={book.totalPages} 
                    errorMessage={errors.page}
                    value={formData.page ?? ""} 
                    onChange={(e) => {
                        const val = e.target.value
                        setFormData(prev => ({ ...prev, page: val === "" ? null : Number(val) }))
                    }} 
                />
            </div>

            <div className="mt-8">
                <Button 
                    onClick={handleAddNote} 
                    disabled={!hasChanges || isLoading}
                >
                    <span>{isLoading ? "Adding note..." : "Add note"}</span>
                </Button>
            </div>
        </Modal>
    )   
}