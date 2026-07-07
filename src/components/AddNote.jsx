import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import PersonalNotesCard from "./PersonalNotesCard";
import Textarea from "./form/Textarea";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

export default function AddNote({ id, notes, totalPages, setBooks, setIsAddNotePopupOpen }) {
    const [formData, setFormData] = useState({
        id: notes.length,
        note: "",
        page: "",
        date: Date.now()
    })

    function hidePopup() {
        setIsAddNotePopupOpen(false)
    }

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
        if (formData.page !== "" && (Number(formData.page) < 1 || Number(formData.page) > Number(totalPages))) newErrorMessages.page = "Enter a valid value"
        
        setErrorMessages(newErrorMessages)
        return Object.values(newErrorMessages).every(error => error === "")
    }

    function addNote() {
        if(!validate()) return
  
        setBooks(prev => prev.map(b => b.id === id ? {...b, notes: [...notes, formData]} : b))
        hidePopup()
    }

    return (
        <div className="fixed inset-0 bg-espresso/40 z-50 flex items-center md:max-w-[440px] md:max-h-[956px]">
            <div className="w-full p-6 bg-beige border border-tan rounded-[20px] mx-6">
                <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} className="cursor-pointer" onClick={hidePopup} />
                <div className="mt-8">
                    <Textarea id={notes.length} label="Note" placeholder="Content" errorMessage={errorMessages.note} value={formData.note} onChange={(e) => setFormData(prev => ({...prev, note: e.target.value}))} />
                </div>
                <div className="mt-4">
                    <NumberInput label="Page" placeholder="Page number" min={0} max={totalPages} errorMessage={errorMessages.page} value={formData.page} onChange={(e) => setFormData(prev => ({...prev, page: e.target.value}))} />
                </div>
                <div className="mt-8">
                    <PrimaryButton label="Add note" onClick={addNote} />
                </div>
            </div>
        </div>
    )   
}