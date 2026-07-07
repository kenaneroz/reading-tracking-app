import DetailsHeader from "../components/DetailsHeader"
import DetailsHero from "../components/DetailsHero"
import ProgressCard from "../components/ProgressCard"
import BookInfoCard from "../components/BookInfoCard"
import ReadingActivityCard from "../components/ReadingActivityCard"
import PersonalNotesCard from "../components/PersonalNotesCard"
import { useParams } from "react-router-dom"
import EditDetails from "../components/EditDetails"
import { useState } from "react"
import ReadingActivityPopup from "../components/ReadingActivityPopup"
import AllNotes from "../components/AllNotes"
import AddNote from "../components/AddNote"

export default function DetailsScreen({ books, setBooks }) {
    const { id } = useParams()
    const book = books.find(book => book.id === Number(id))

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)
    const [isReadingActivityPopupOpen, setIsReadingActivityPopupOpen] = useState(false)
    const [isAllNotesPopupOpen, setIsAllNotesPopupOpen] = useState(false)
    const [isAddNotePopupOpen, setIsAddNotePopupOpen] = useState(false)

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto relative">
            <DetailsHeader book={book} setBooks={setBooks} setIsEditPopupOpen={setIsEditPopupOpen} />
            <DetailsHero title={book.title} author={book.author} cover={book.cover} status={book.status} />
            <ProgressCard currentPage={book.currentPage} totalPages={book.totalPages} setIsEditPopupOpen={setIsEditPopupOpen} />
            <BookInfoCard genre={book.genre} totalPages={book.totalPages} dateAdded={book.dateAdded} />
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
                            book.notes.slice(-3).reverse().map(n => (
                                <PersonalNotesCard note={n.note} page={n.page} date={n.date} />
                            ))
                        }
                    </div>

                    <button className="cursor-pointer w-full h-13 px-6 rounded-[26px] text-taupe text-body mt-4 border border-tan border-dashed hover:bg-tan transition-all duration-300"
                        onClick={() => setIsAddNotePopupOpen(true)}
                    >Add notes</button>
                </div>

                { isAllNotesPopupOpen &&
                    <AllNotes notes={book.notes} setIsAllNotesPopupOpen={setIsAllNotesPopupOpen} />
                }

                { isAddNotePopupOpen &&
                    <AddNote id={book.id} notes={book.notes} totalPages={book.totalPages} setBooks={setBooks} setIsAddNotePopupOpen={setIsAddNotePopupOpen} />
                }
            </div>

            { isEditPopupOpen &&
                <EditDetails id={book.id} title={book.title} author={book.author} genre={book.genre} cover={book.cover} status={book.status} currentPage={book.currentPage} totalPages={book.totalPages} booksLength={books.length} setBooks={setBooks} setIsEditPopupOpen={setIsEditPopupOpen} />
            }

            { isReadingActivityPopupOpen &&
                <ReadingActivityPopup setIsReadingActivityPopupOpen={setIsReadingActivityPopupOpen} readingActivity={book.readingActivity} totalPages={book.totalPages} />                
            }
        </div>
    )
}