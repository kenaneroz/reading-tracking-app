import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import PersonalNotesCard from "./PersonalNotesCard";
import Textarea from "./form/Textarea";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

export default function AddNote({ id, notes, totalPages, setBooks, setIsAddNotePopupOpen, addNoteService }) {
    const [formData, setFormData] = useState({
        content: "",
        page: null
    })

    function hidePopup() {
        setIsAddNotePopupOpen(false)
    }

    async function handleAddNote() {
        const newNote = await addNoteService(id, formData)

        setBooks(prev => prev.map(book =>
            book._id === id 
            ? { 
                ...book, 
                notes: [...book.notes, newNote]
            }
            : book
        ))
        console.log(newNote)

        hidePopup()
    }

    return (
        <div className="fixed inset-0 bg-espresso/40 z-50 flex items-center md:max-w-[440px] md:max-h-[956px]">
            <div className="w-full p-6 bg-beige border border-tan rounded-[20px] mx-6">
                <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={hidePopup} />
                
                <div className="mt-8">
                    <Textarea 
                        id={notes.length} 
                        label="Content" 
                        placeholder="Content" 
                        errorMessage="" 
                        value={formData.content} 
                        onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))} 
                    />
                </div>

                <div className="mt-4">
                    <NumberInput 
                        label="Page number" 
                        placeholder="Page number" 
                        min={0} max={totalPages} 
                        errorMessage="" 
                        value={formData.page} 
                        onChange={(e) => setFormData(prev => ({...prev, page: Number(e.target.value)}))} 
                    />
                </div>

                <div className="mt-8">
                    <PrimaryButton 
                        label="Add note" 
                        onClick={handleAddNote} 
                    />
                </div>
            </div>
        </div>
    )   
}