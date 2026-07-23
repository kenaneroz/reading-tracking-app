import DetailsHeader from "../components/DetailsHeader"
import DetailsHero from "../components/DetailsHero"
import ProgressCard from "../components/ProgressCard"
import BookInfoCard from "../components/BookInfoCard"
import ReadingActivityCard from "../components/ReadingActivityCard"
import PersonalNotesCard from "../components/PersonalNotesCard"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReadingActivityPopup from "../components/ReadingActivityPopup"
import AllNotes from "../components/AllNotes"
import AddNote from "../components/AddNote"
import EditNote from "../components/EditNote"
import ConfirmDeletePopup from "../components/ConfirmDeletePopup"
import EditDetails from "../components/EditDetails"

export default function DetailsScreen({ books, setBooks, loading, updateBook, deleteBook, addNoteService, updateNoteService, deleteNoteService }) {
    const { id } = useParams()

    if (loading) return <span></span>
 
    const book = books.find(book => book._id === id)

    const navigate = useNavigate()
    if (!book) return <div>
        <p>Book not found</p>
        <button className="cursor-pointer">Return home screen</button>
    </div>

    const [isReadingActivityPopupOpen, setIsReadingActivityPopupOpen] = useState(false)
    const [isAllNotesPopupOpen, setIsAllNotesPopupOpen] = useState(false)
    const [isAddNotePopupOpen, setIsAddNotePopupOpen] = useState(false)
    const [isEditNotePopupOpen, setIsEditNotePopupOpen] = useState(false)
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    if (loading) return <span></span>

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto relative">
            <DetailsHeader 
                book={book} 
                setBooks={setBooks} 
                updateBook={updateBook} 
                deleteBook={deleteBook} 
                setIsEditPopupOpen={setIsEditPopupOpen}
            />
            <DetailsHero title={book.title} author={book.author} cover={book.cover} status={book.status} />
            <ProgressCard 
                currentPage={book.currentPage} 
                totalPages={book.totalPages} 
                setIsEditPopupOpen={setIsEditPopupOpen}
            />
            <BookInfoCard genre={book.genre} totalPages={book.totalPages} createdAt={book.createdAt} />
            <div className="mt-8 mx-6">
                <div className="flex justify-between">
                    <h2 className="text-espreso h4">Reading Activity</h2>
                    <button className="text-taupe text-body-sm cursor-pointer hover:text-espresso transition-all duration-300"
                        onClick={() => setIsReadingActivityPopupOpen(true)}
                    >View all</button>
                </div>
                <ReadingActivityCard readingActivity={book.readingActivity} currentPage={book.currentPage} totalPages={book.totalPages} />
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

                    <button className="cursor-pointer w-full h-13 px-6 rounded-[26px] text-taupe text-body mt-4 border border-tan border-dashed hover:bg-tan transition-all duration-300"
                        onClick={() => setIsAddNotePopupOpen(true)}
                    >Add notes</button>
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
                        addNoteService={addNoteService}
                    />
                }
            </div>

            { isEditPopupOpen &&
                <EditDetails 
                    book={book} 
                    setBooks={setBooks} 
                    setIsEditPopupOpen={setIsEditPopupOpen} 
                    updateBook={updateBook} 
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
                    updateNoteService={updateNoteService}
                    selectedNoteId={selectedNoteId}
                    deleteNoteService={deleteNoteService}
                />
            }
        </div>
    )
}