import { useRef, useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal.jsx"
import Textarea from "../shared/form/Textarea"
import Input from "../shared/form/Input"
import Button from "../shared/Button.jsx"
import ConfirmDeletePopup from "../shared/ConfirmDeletePopup.jsx"

import { useBooks } from "../../context/BookContext"
import validateUpdateNote from "../../utils/validators/validateUpdateNote.js"

export default function EditNote({ book, closeEditNotePopup, selectedNoteId }) {
    const { updateNote, deleteNote } = useBooks()
    
    const note = book?.notes?.find(n => n._id === selectedNoteId) || {}

    const initialFormData = useRef({
        content: note.content ?? "",
        page: note.page ?? null
    })

    const [formData, setFormData] = useState({
        content: note.content ?? "",
        page: note.page ?? null
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)

    const validationErrors = validateUpdateNote(formData, book)
    const hasErrors = Object.keys(validationErrors).length > 0
    const hasChanges = Object.keys(initialFormData.current).some(
        key => formData[key] !== initialFormData.current[key]
    )

    async function handleUpdateNote() {
        if (!hasChanges || loading) return
        
        if (hasErrors) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        setErrors({})

        try {
            await updateNote(book._id, selectedNoteId, {
                content: formData.content.trim(),
                page: formData.page
            })
            closeEditNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteNote() {
        setLoading(true)
        try {
            await deleteNote(book._id, selectedNoteId)
            setIsDeleteConfirmPopupOpen(false)
            closeEditNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)            
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {isDeleteConfirmPopupOpen ? (
                <ConfirmDeletePopup
                    cancel={() => setIsDeleteConfirmPopupOpen(false)}
                    delete_={handleDeleteNote}
                    message="This action cannot be undone."
                />
            ) : (
                <Modal>
                    <div className="flex justify-between items-center">
                        <HugeiconsIcon 
                            icon={Cancel01Icon} 
                            size={24} 
                            strokeWidth={1.5} 
                            className="cursor-pointer text-espresso" 
                            onClick={closeEditNotePopup} 
                        />
                        <button 
                            type="button"
                            className="bg-red/60 text-beige px-4 py-2 rounded-xl text-body-sm hover:bg-red transition-all duration-300 cursor-pointer"
                            onClick={() => setIsDeleteConfirmPopupOpen(true)}
                            disabled={loading}
                        >
                            Delete
                        </button>
                    </div>
        
                    <div className="mt-8">
                        <Textarea 
                            id="edit-note-content"
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
                            id="edit-note-page"
                            label="Page" 
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
                            onClick={handleUpdateNote} 
                            disabled={!hasChanges || loading}
                        >
                            <span>{loading ? "Updating..." : "Update note"}</span>
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    )
}