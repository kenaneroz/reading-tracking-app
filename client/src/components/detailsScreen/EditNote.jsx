import { useState } from "react"
import { useParams } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalIcon, Cancel01Icon, Edit01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal.jsx"
import Textarea from "../shared/form/Textarea"
import Input from "../shared/form/Input"
import Button from "../shared/Button.jsx";
import AddNote from "./AddNote"
import ConfirmDeletePopup from "../shared/ConfirmDeletePopup.jsx"

import {
    updateNoteService,
    deleteNoteService
} from "../../services/bookService.js"

import { useBooks } from "../../context/BookContext"

export default function EditNote({ book, hideAddNotePopup, selectedNoteId }) {
    const { updateNote, deleteNote } = useBooks()
    const note = book.notes.find(note => note._id === selectedNoteId)
    const [formData, setFormData] = useState({
        content: note.content,
        page: note.page
    })
    const [errors, setErrors] = useState({})
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)

    async function handleUpdateNote() {
        try {
            updateNote(book._id, selectedNoteId, formData)
            hideAddNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)
        }
    }

    async function handleDeleteNote() {
        try {
            deleteNote(book._id, selectedNoteId)
            hideAddNotePopup()
        } catch (error) {
            setErrors(error.errors || {})
            console.log(error)            
        }
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
                        <Input
                            type="number"
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
                        <Button 
                            onClick={handleUpdateNote} 
                        >
                            <span>Update note</span>
                        </Button>
                    </div>
                </Modal>
            }
        </>
    )
} 