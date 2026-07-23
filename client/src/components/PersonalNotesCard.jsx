import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, Cancel01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import Textarea from "./form/Textarea";
import NumberInput from "./form/NumberInput";
import PrimaryButton from "./PrimaryButton";
import AddNote from "./AddNote";

export default function PersonalNotesCard({ id, content, page, date, setIsEditNotePopupOpen, setSelectedNoteId }) {
    const date_ = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    
    function selectNote() {
        setSelectedNoteId(id)
        setIsEditNotePopupOpen(true)
    }

    return (
        <div className="border-l-[3px] border-tan pl-3 gap-4 relative pt-1 pb-4">
            <p className="text-coffee text-body">"{content}"</p>
            <div className="flex justify-between items-end mt-3">
                <div className="flex gap-4">
                    {page && <p className="text-taupe text-body-xs">p. {page}</p>}
                    <p className="text-taupe text-body-xs">{date_}</p>
                </div>
                <button className="text-taupe text-body-xs flex gap-2 justify-end cursor-pointer"
                    onClick={selectNote}
                > 
                    Edit
                    <HugeiconsIcon
                        icon={Edit01Icon}
                        size={16} 
                        strokeWidth={1.5}
                    />
                </button>
            </div>
        </div>
    )
} 