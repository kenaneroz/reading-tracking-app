import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import PersonalNotesCard from "./PersonalNotesCard";

export default function AllNotes({ notes, setIsAllNotesPopupOpen, setSelectedNoteId, setIsEditNotePopupOpen }) {
    return (
        <div className="fixed bg-espresso/40 inset-0 z-30">
            <div className="p-6 bg-beige border border-tan rounded-[20px] fixed left-6 right-6 top-6 bottom-6 md:max-w-[392px] md:max-h-[908px] overflow-y-auto">

                <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={24} 
                    strokeWidth={1.5}
                    className="text-espresso cursor-pointer"
                    onClick={() => setIsAllNotesPopupOpen(false)}
                />
            
                <div className="mt-8">
                    <p className="h2 text-espresso">Personal notes</p>
                    <p className="text-body text-coffee mt-2">A log of all your notes for this book.</p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    {
                        notes.length === 0 ?
                        <p className="text-taupe text-body-sm">You haven't added any notes yet</p>
                        :
                        notes.slice().reverse().map((n, index) => (
                            <PersonalNotesCard id={n._id} content={n.content} page={n.page} date={n.date} setSelectedNoteId={setSelectedNoteId} setIsEditNotePopupOpen={setIsEditNotePopupOpen} />
                        ))
                    }
                </div>
            </div>
        </div>
    )   
}