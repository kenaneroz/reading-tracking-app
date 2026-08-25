import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import DetailsHeader from "../components/detailsScreen/DetailsHeader"
import DetailsHero from "../components/detailsScreen/DetailsHero"
import ProgressCard from "../components/detailsScreen/ProgressCard"
import BookInfoCard from "../components/detailsScreen/BookInfoCard"
import ReadingActivityCard from "../components/detailsScreen/ReadingActivityCard"
import PersonalNotesCard from "../components/detailsScreen/PersonalNotesCard"
import ReadingActivityPopup from "../components/detailsScreen/ReadingActivityPopup"
import AllNotes from "../components/detailsScreen/AllNotes"
import AddNote from "../components/detailsScreen/AddNote"
import EditNote from "../components/detailsScreen/EditNote"
import EditDetails from "../components/detailsScreen/EditDetails"
import Button from "../components/shared/Button"

import { getBookStatus } from "../utils/bookUtils.js"
import { useBooks } from "../context/BookContext"

export default function DetailsScreen() {
    const { books, loading } = useBooks()
    const { id } = useParams()
    const navigate = useNavigate()

    const [isReadingActivityPopupOpen, setIsReadingActivityPopupOpen] = useState(false)
    const [isAllNotesPopupOpen, setIsAllNotesPopupOpen] = useState(false)
    const [isAddNotePopupOpen, setIsAddNotePopupOpen] = useState(false)
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const book = books?.find(b => b._id === id)

    if (loading) {
        return <div className="md:w-110 h-dvh md:h-239 bg-cream" />
    }

    if (!book) {
        return (
            <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col items-center justify-center p-6 text-center">
                <p className="text-espresso h5">Book not found</p>
                <button
                    className="mt-4 text-taupe text-body-sm hover:text-espresso cursor-pointer underline transition-all duration-300"
                    onClick={() => navigate("/home")}
                >
                    Return home screen
                </button>
            </div>
        )
    }

    const notes = book.notes || []
    const recentNotes = notes.slice(-3).reverse()

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto relative">
            <DetailsHeader 
                book={book} 
                setIsEditPopupOpen={setIsEditPopupOpen} 
            />

            <DetailsHero 
                title={book.title} 
                author={book.author} 
                cover={book.cover} 
                status={getBookStatus(book.currentPage, book.totalPages)} 
            />

            <ProgressCard 
                currentPage={book.currentPage} 
                totalPages={book.totalPages} 
                setIsEditPopupOpen={setIsEditPopupOpen}
            />

            <BookInfoCard 
                genre={book.genre} 
                totalPages={book.totalPages} 
                createdAt={book.createdAt} 
                format={book.format}
                rating={book.rating}
            />

            <div className="mt-8 mx-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-espresso h4">Reading Activity</h2>
                    <button 
                        className="text-taupe text-body-sm cursor-pointer hover:text-espresso transition-all duration-300"
                        onClick={() => setIsReadingActivityPopupOpen(true)}
                    >
                        View all
                    </button>
                </div>
                <ReadingActivityCard book={book} />
            </div>

            <div className="mt-8 mx-6 pb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-espresso h4">Personal notes</h2>
                    <button 
                        className="text-taupe text-body-sm hover:text-espresso transition-all duration-300 cursor-pointer"
                        onClick={() => setIsAllNotesPopupOpen(true)}
                    >
                        View all
                    </button>
                </div>

                <div className="mt-4">   
                    <div className="flex flex-col gap-4">
                        {notes.length === 0 ? (
                            <p className="text-body-sm text-taupe text-center">
                                You haven't added any notes yet
                            </p>
                        ) : (
                            recentNotes.map(note => (
                                <PersonalNotesCard 
                                    key={note._id}
                                    id={note._id} 
                                    content={note.content} 
                                    page={note.page} 
                                    date={note.date} 
                                    totalPages={book.totalPages} 
                                    setIsEditNotePopupOpen={setIsEditNotePopupOpen} 
                                    setSelectedNoteId={setSelectedNoteId}
                                />
                            ))
                        )}
                    </div>

                    <Button
                        variant="dashed"
                        onClick={() => setIsAddNotePopupOpen(true)}
                        className="text-taupe mt-4 w-full"
                    >
                        <span>Add notes</span>
                    </Button>
                </div>

                {isAllNotesPopupOpen && (
                    <AllNotes 
                        notes={notes} 
                        setIsAllNotesPopupOpen={setIsAllNotesPopupOpen} 
                        setSelectedNoteId={setSelectedNoteId} 
                        setIsEditNotePopupOpen={setIsEditNotePopupOpen} 
                    />
                )}

                {isAddNotePopupOpen && (
                    <AddNote 
                        book={book}
                        hideAddNotePopup={() => setIsAddNotePopupOpen(false)} 
                    />
                )}
            </div>

            {isEditPopupOpen && (
                <EditDetails 
                    book={book} 
                    setIsEditPopupOpen={setIsEditPopupOpen} 
                />
            )}

            {isReadingActivityPopupOpen && (
                <ReadingActivityPopup 
                    setIsReadingActivityPopupOpen={setIsReadingActivityPopupOpen} 
                    readingActivity={book.readingActivity || []} 
                    totalPages={book.totalPages} 
                />                
            )}

            {isEditNotePopupOpen && (
                <EditNote 
                    book={book} 
                    closeEditNotePopup={() => setIsEditNotePopupOpen(false)} 
                    selectedNoteId={selectedNoteId}
                />
            )}
        </div>
    )
}