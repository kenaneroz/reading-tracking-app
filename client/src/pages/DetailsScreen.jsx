import DetailsHeader from "../components/detailsScreen/DetailsHeader"
import DetailsHero from "../components/detailsScreen/DetailsHero"
import ProgressCard from "../components/detailsScreen/ProgressCard"
import BookInfoCard from "../components/detailsScreen/BookInfoCard"
import ReadingActivityCard from "../components/detailsScreen/ReadingActivityCard"
import PersonalNotesCard from "../components/detailsScreen/PersonalNotesCard"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReadingActivityPopup from "../components/detailsScreen/ReadingActivityPopup"
import AllNotes from "../components/detailsScreen/AllNotes"
import AddNote from "../components/detailsScreen/AddNote"
import EditNote from "../components/detailsScreen/EditNote"
import ConfirmDeletePopup from "../components/shared/ConfirmDeletePopup"
import EditDetails from "../components/detailsScreen/EditDetails"
import Button from "../components/shared/Button"

import { getBookStatus } from "../utils/bookUtils.js"

export default function DetailsScreen({
    books,
    setBooks,
    loading,
}) {
    const { id } = useParams()
    const navigate = useNavigate()

    const [isReadingActivityPopupOpen, setIsReadingActivityPopupOpen] = useState(false)
    const [isAllNotesPopupOpen, setIsAllNotesPopupOpen] = useState(false)
    const [isAddNotePopupOpen, setIsAddNotePopupOpen] = useState(false)
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false)
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const book = books.find(book => book._id === id)

    if (loading) {
        return <span></span>
    }

    if (!book) {
        return (
            <div>
                <p>Book not found</p>

                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Return home screen
                </button>
            </div>
        )
    }

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto relative">
            <DetailsHeader 
                book={book} 
                setBooks={setBooks} 
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
                <div className="flex justify-between">
                    <h2 className="text-espreso h4">Reading Activity</h2>
                    <button className="text-taupe text-body-sm cursor-pointer hover:text-espresso transition-all duration-300"
                        onClick={() => setIsReadingActivityPopupOpen(true)}
                    >View all</button>
                </div>
                <ReadingActivityCard 
                    readingActivity={book.readingActivity} 
                    currentPage={book.currentPage} 
                    totalPages={book.totalPages} 
                    id={id} setBooks={setBooks} 
                />
            </div>
            <div className="mt-8 mx-6 pb-6">
                <div className="flex justify-between">
                    <h2 className="text-espreso h4">Personal notes</h2>
                    <button className="text-taupe text-body-sm hover:text-espresso transition-all duration-300 cursor-pointer"
                        onClick={() => setIsAllNotesPopupOpen(true)}
                    >View all</button>
                </div>

                <div className="mt-4">   
                    <div className="flex flex-col gap-4">
                        {
                            book.notes.length === 0 ?
                            <p className="text-body-sm text-taupe text-center">You haven't added any notes yet</p>
                            :
                            book.notes.slice(-3).reverse().map(note => (
                                <PersonalNotesCard 
                                    setBooks={setBooks} 
                                    id={note._id} 
                                    content={note.content} 
                                    page={note.page} 
                                    date={note.date} 
                                    totalPages={book.totalPages} 
                                    setIsEditNotePopupOpen={setIsEditNotePopupOpen} 
                                    setSelectedNoteId={setSelectedNoteId}
                                />
                            ))
                        }
                    </div>

                    <Button
                        variant="dashed"
                        onClick={() => setIsAddNotePopupOpen(true)}
                        className="text-taupe mt-4"
                    >
                        <span>Add notes</span>
                    </Button>
                </div>

                { isAllNotesPopupOpen &&
                    <AllNotes notes={book.notes} setIsAllNotesPopupOpen={setIsAllNotesPopupOpen} setSelectedNoteId={setSelectedNoteId} setIsEditNotePopupOpen={setIsEditNotePopupOpen} />
                }

                { isAddNotePopupOpen &&
                    <AddNote 
                        id={id} 
                        notes={book.notes} 
                        totalPages={book.totalPages} 
                        setBooks={setBooks} 
                        setIsAddNotePopupOpen={setIsAddNotePopupOpen} 
                    />
                }
            </div>

            { isEditPopupOpen &&
                <EditDetails 
                    book={book} 
                    setBooks={setBooks} 
                    setIsEditPopupOpen={setIsEditPopupOpen} 
                />
            }

            { isReadingActivityPopupOpen &&
                <ReadingActivityPopup setIsReadingActivityPopupOpen={setIsReadingActivityPopupOpen} readingActivity={book.readingActivity} totalPages={book.totalPages} />                
            }

            { isEditNotePopupOpen &&
                <EditNote 
                    book={book} 
                    setBooks={setBooks} 
                    setIsEditNotePopupOpen={setIsEditNotePopupOpen} 
                    setIsDeleteConfirmPopupOpen={setIsDeleteConfirmPopupOpen} 
                    selectedNoteId={selectedNoteId}
                />
            }
        </div>
    )
}
