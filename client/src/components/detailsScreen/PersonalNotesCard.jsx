import { HugeiconsIcon } from "@hugeicons/react";
import { Pen01Icon, FilePenLineIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import Textarea from "../shared/form/Textarea";
import Button from "../shared/Button";
import AddNote from "./AddNote";

import { useBooks } from "../../context/BookContext"

export default function PersonalNotesCard(
    { 
        id, 
        content, 
        page, 
        date, 
        setIsEditNotePopupOpen, 
        setSelectedNoteId,
        onClick,
        noteIdsToDelete = []
    }
) {
    const date_ = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    
    function selectNote() {
        setSelectedNoteId(id)
        setIsEditNotePopupOpen(true)
    }

    const border = 
        noteIdsToDelete.includes(id)
            ? "border border-red rounded-lg p-3"
            : "border-l-[3px] border-tan pl-3 pt-1 pb-4"

    return (
        <div 
            className={`cursor-pointer relative ${border}`}
            onClick={onClick}    
        >
            <p className="text-coffee text-body">"{content}"</p>
            <div className="flex justify-between items-end mt-3">
                <div className="flex gap-4">
                    {page && <p className="text-taupe text-body-xs">p. {page}</p>}
                    <p className="text-taupe text-body-xs">{date_}</p>
                </div>
                <button className="text-taupe text-body-xs flex gap-2 items-center cursor-pointer hover:text-espresso transition-all duration-300"
                    onClick={(e) => {
                        selectNote()
                        e.stopPropagation()
                    }}
                > 
                    Edit
                    <HugeiconsIcon
                        icon={Pen01Icon}
                        size={12} 
                        strokeWidth={1}
                    />
                </button>
            </div>
        </div>
    )
} 