import { useState } from "react"
import { useParams } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalIcon, Cancel01Icon, Edit01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal.jsx"
import Textarea from "../shared/form/Textarea"
import NumberInput from "../shared/form/NumberInput"
import PrimaryButton from "../shared/PrimaryButton.jsx";
import AddNote from "./AddNote"
import ConfirmDeletePopup from "../shared/ConfirmDeletePopup.jsx"

import {
    updateNoteService,
    deleteNoteService
} from "../../services/bookService.js"

export default function EditNote({ book, setBooks, setIsEditNotePopupOpen, selectedNoteId }) {
    const note = book.notes.find(note => note._id === selectedNoteId)
    const [errors, setErrors] = useState({})
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)

    const [formData, setFormData] = useState({
        content: note.content,
        page: note.page
    })

    async function handleUpdateNote() {
        try {
            const n = await updateNoteService(book._id, selectedNoteId, formData)
    
            setBooks(prev => prev.map(b => 
                b._id === book._id
                ? { 
                    ...b,  
                    notes: b.notes.map(note => 
                        note._id === selectedNoteId
                        ? { ...n }
                        : note
                    )
                }
                : b
            ))
    
            setIsEditNotePopupOpen(false)
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

    async function handleDeleteNote() {
        const n = await deleteNoteService(book._id, selectedNoteId)

        setBooks(prev => prev.map(b =>
            b._id === book._id
            ? {
                ...b,
                notes: b.notes.filter(note => 
                    note._id !== selectedNoteId
                )
            }
            : b
        ))

        setIsEditNotePopupOpen(false)
    }

    return (
        <>
            {isDeleteConfirmPopupOpen
                ? <ConfirmDeletePopup
                    cancel={() => {
                        setIsDeleteConfirmPopupOpen(false)
                        setIsEditNotePopupOpen(false)
                    }}
                    delete_={handleDeleteNote}
                    message="This action cannot be undone."
                />
                : <Modal>
                    <div className="flex justify-between">
                        <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={() => setIsEditNotePopupOpen(false)} />
                        <button 
                            className="bg-red/60 text-beige px-4 py-2 rounded-xl text-body-sm hover:bg-red transition-all duration-300 cursor-pointer"
                            onClick={() => setIsDeleteConfirmPopupOpen(true)}
                        >Delete</button>
                    </div>
        
                    <div className="mt-8">
                        <Textarea 
                            label="Content" 
                            placeholder="Content" 
                            errorMessage={errors.content}
                            value={formData.content} 
                            onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                        />
                    </div>
        
                    <div className="mt-4">
                        <NumberInput 
                            label="Page" 
                            placeholder="Page number" 
                            min={0} 
                            max={book.totalPages} 
                            errorMessage={errors.page}
                            value={formData.page} 
                            onChange={(e) => setFormData(prev => ({...prev, page: Number(e.target.value)}))} 
                        />
                    </div>
        
                    <div className="mt-8">
                        <PrimaryButton 
                            label="Update note" 
                            onClick={handleUpdateNote} 
                        />
                    </div>
                </Modal>
            }
        </>
    )
} 