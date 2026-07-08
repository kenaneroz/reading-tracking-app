import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, Cancel01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import Textarea from "./form/Textarea";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import AddNote from "./AddNote";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export default function EditNote({ book, selectedNoteId, setBooks, setIsEditNotePopupOpen, setIsDeleteConfirmPopupOpen }) {
    const selectedNote = book.notes.find(note => note.id === selectedNoteId)
    const [formData, setFormData] = useState({
        id: selectedNoteId,
        note: selectedNote.note,
        page: selectedNote.page,
        date: Date.now()
    })
    console.log(selectedNote)

    const [errorMessages, setErrorMessages] = useState({
        note: "",
        page: ""
    })

    function validate() {
        const newErrorMessages = {
            note: "",
            page: ""
        }
        if (formData.note === "") newErrorMessages.note = "This field is required"
        if (formData.page !== "" && (Number(formData.page) < 1 || Number(formData.page) > Number(book.totalPages))) newErrorMessages.page = "Enter a valid value"
        
        setErrorMessages(newErrorMessages)
        return Object.values(newErrorMessages).every(error => error === "")
    }

    function updateNote() {
        if(!validate()) return
  
        setBooks(prev => prev.map(b => b.id === book.id ? {...b, notes: b.notes.map(n => n.id === selectedNoteId ? formData : n)} : b))
        setIsEditNotePopupOpen(false)
    }

    return (
        <div className="fixed inset-0 bg-espresso/40 z-40 flex items-center md:max-w-[440px] md:max-h-[956px]">
            <div className="w-full p-6 bg-beige border border-tan rounded-[20px] mx-6">
                <div className="flex justify-between">
                    <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={() => setIsEditNotePopupOpen(false)} />
                    <button className="bg-danger/60 text-beige px-4 py-2 rounded-xl text-body-sm hover:bg-danger transition-all duration-300 cursor-pointer"
                        onClick={() => setIsDeleteConfirmPopupOpen(true)}
                    >Delete</button>
                </div>
                <div className="mt-8">
                    <Textarea label="Note" placeholder="Content" errorMessage={errorMessages.note} value={formData.note} onChange={(e) => setFormData(prev => ({...prev, note: e. target.value}))} />
                </div>
                <div className="mt-4">
                    <NumberInput label="Page" placeholder="Page number" min={0} max={book.totalPages} errorMessage={errorMessages.page} value={formData.page} onChange={(e) => setFormData(prev => ({...prev, page: e.target.value}))} />
                </div>
                <div className="mt-8">
                    <PrimaryButton label="Update note" onClick={updateNote} />
                </div>
            </div>
        </div>
    )
} 