import { useState } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal"
import Textarea from "../shared/form/Textarea"
import Input from "../shared/form/Input"
import Button from "../shared/Button"

import { useBooks } from "../../context/BookContext"

export default function AddNote({ 
    id, 
    notes, 
    totalPages, 
    hideAddNotePopup 
}) {
    const { addNote } = useBooks()

    const [formData, setFormData] = useState({
        content: "",
        page: null
    })
    const [errors, setErrors] = useState({})

    async function handleAddNote() {
        try {
            addNote(id, formData)
            hideAddNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

    return (
        <Modal>
            <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={hideAddNotePopup} />
            
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
                <Input
                    type="number"
                    label="Page number" 
                    placeholder="Page number" 
                    min={0}
                    max={totalPages} 
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