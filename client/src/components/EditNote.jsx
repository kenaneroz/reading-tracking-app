import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, Cancel01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import Textarea from "./form/Textarea";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import AddNote from "./AddNote";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { useParams } from "react-router-dom";

export default function EditNote({ book, setBooks, setIsEditNotePopupOpen, setIsDeleteConfirmPopupOpen, updateNoteService, selectedNoteId, deleteNoteService }) {
    const note = book.notes.find(note => note._id === selectedNoteId)

    const [formData, setFormData] = useState({
        content: note.content,
        page: note.page
    })

    async function handleUpdateNote() {
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
        <div className="fixed inset-0 bg-espresso/40 z-40 flex items-center md:max-w-[440px] md:max-h-[956px]">
            <div className="w-full p-6 bg-beige border border-tan rounded-[20px] mx-6">
                <div className="flex justify-between">
                    <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={() => setIsEditNotePopupOpen(false)} />
                    <button 
                        className="bg-danger/60 text-beige px-4 py-2 rounded-xl text-body-sm hover:bg-danger transition-all duration-300 cursor-pointer"
                        onClick={handleDeleteNote}
                    >Delete</button>
                </div>

                <div className="mt-8">
                    <Textarea 
                        label="Content" 
                        placeholder="Content" 
                        errorMessage="" 
                        value={formData.content} 
                        onChange={(e) => setFormData(prev => ({...prev, content: e. target.value}))}
                    />
                </div>

                <div className="mt-4">
                    <NumberInput 
                        label="Page" 
                        placeholder="Page number" 
                        min={0} 
                        max={book.totalPages} 
                        errorMessage="" 
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
            </div>
        </div>
    )
} 