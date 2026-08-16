import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal"
import PersonalNotesCard from "./PersonalNotesCard"
import Textarea from "../shared/form/Textarea"
import NumberInput from "../shared/form/NumberInput"
import Button from "../shared/Button"

import { addNoteService } from "../../services/bookService"

export default function AddNote({ id, notes, totalPages, setBooks, setIsAddNotePopupOpen }) {
    const [formData, setFormData] = useState({
        content: "",
        page: null
    })
    const [errors, setErrors] = useState({})
console.log(errors)
    function hidePopup() {
        setIsAddNotePopupOpen(false)
    }

    async function handleAddNote() {
        try {
            const newNote = await addNoteService(id, formData)
    
            setBooks(prev => prev.map(book =>
                book._id === id 
                ? { 
                    ...book, 
                    notes: [...book.notes, newNote]
                }
                : book
            ))
    
            hidePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

    return (
        <Modal>
            <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={hidePopup} />
            
            <div className="mt-8">
                <Textarea 
                    id={notes.length} 
                    label="Content" 
                    placeholder="Content" 
                    errorMessage={errors.content}
                    value={formData.content} 
                    onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))} 
                />
            </div>

            <div className="mt-4">
                <NumberInput 
                    label="Page number" 
                    placeholder="Page number" 
                    min={0} max={totalPages} 
                    errorMessage={errors.page}
                    value={formData.page} 
                    onChange={(e) => setFormData(prev => ({...prev, page: Number(e.target.value)}))} 
                />
            </div>

            <div className="mt-8">
                <Button 
                    onClick={handleAddNote} 
                >
                    <span>Add note</span>
                </Button>
            </div>
        </Modal>
    )   
}