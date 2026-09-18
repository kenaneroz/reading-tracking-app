import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import PersonalNotesCard from "./PersonalNotesCard";
import BottomSheet from "../shared/BottomSheet"
import ConfirmDeletePopup from "../shared/ConfirmDeletePopup"
import Button from "../shared/Button"
import { useState } from "react";

import { useBooks } from "../../context/BookContext"
import { useParams } from "react-router-dom";

export default function AllNotes({ 
    notes, 
    setIsAllNotesPopupOpen, 
    setSelectedNoteId, 
    setIsEditNotePopupOpen,
    noteIdsToDelete,
    setNoteIdsToDelete
}) {
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { deleteNotes } = useBooks()

    const { id } = useParams()

    function toggleNote(id) {
        setNoteIdsToDelete(prev => 
            prev.includes(id) 
                ? prev.filter(noteId => noteId !== id)
                : [...prev, id]
        )
    }

    return (
        <BottomSheet
            onClose={() => {
                setIsAllNotesPopupOpen(false)
                setNoteIdsToDelete([])
            }}
            headerText={`${noteIdsToDelete.length} ${noteIdsToDelete.length > 1 ? "notes" : "note"} selected`}
            height="max-h-[85dvh] md:max-h-204"
        >
            {/* Header */}
            <div className="mt-8 shrink-0">
                <p className="h2 text-espresso">Personal notes</p>
                <p className="text-body text-coffee mt-2">A log of all your notes for this book.</p>
            </div>

            {/* Notes */}
            <div className="mt-8 flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">
                {
                    notes.length === 0 ?
                    <p className="text-taupe text-body-sm">You haven't added any notes yet</p>
                    :
                    notes.slice().reverse().map((n, index) => (
                        <PersonalNotesCard 
                            id={n._id} 
                            content={n.content} 
                            page={n.page} 
                            date={n.date} 
                            setSelectedNoteId={setSelectedNoteId} 
                            setIsEditNotePopupOpen={setIsEditNotePopupOpen} 
                            onClick={() => toggleNote(n._id)}
                            noteIdsToDelete={noteIdsToDelete}
                        />
                    ))
                }
            </div>
            
            {/* Buttons */}
            <div className="shrink-0 flex flex-col gap-3 mt-3">
                <div className="flex gap-3">
                    <Button 
                        variant="outline"
                        onClick={() => setNoteIdsToDelete([])}
                        disabled={noteIdsToDelete.length === 0}
                        className="flex-2"
                    >
                        Clear
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setNoteIdsToDelete(notes.slice(0, 50).map(note => note._id))}
                        disabled={noteIdsToDelete.length === 50 || noteIdsToDelete.length === notes.length}
                        className="flex-3"
                    >
                        Select all <span className="font-normal text-espresso/80 text-body-xs">(up to 50)</span>
                    </Button>
                </div>

                <Button
                    variant="danger"
                    disabled={noteIdsToDelete.length === 0}
                    onClick={() => setIsConfirmDeleteOpen(true)}
                >
                    {
                        noteIdsToDelete.length === 0
                            ? "Delete"
                            : `Delete ${noteIdsToDelete.length} ${noteIdsToDelete.length > 1 ? "notes" : "note"}`
                    }
                </Button>
            </div>

            {isConfirmDeleteOpen &&
                <ConfirmDeletePopup
                    cancel={() => setIsConfirmDeleteOpen(false)}
                    delete_={() => {
                        deleteNotes(id, noteIdsToDelete)
                        setIsConfirmDeleteOpen(false)
                    }}
                    message="This will permanently delete the selected notes. This action cannot be undone."
                    isDeleting={isDeleting}
                />
            }
        </BottomSheet>
    )   
}