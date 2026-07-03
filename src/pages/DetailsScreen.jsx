import DetailsHeader from "../components/DetailsHeader"
import DetailsHero from "../components/DetailsHero"
import ProgressCard from "../components/ProgressCard"
import BookInfoCard from "../components/BookInfoCard"
import ReadingActivityCard from "../components/ReadingActivityCard"
import PersonalNotesCard from "../components/PersonalNotesCard"
import { useParams } from "react-router-dom"
import EditDetails from "../components/EditDetails"
import { useState } from "react"

export default function DetailsScreen({ books, setBooks }) {
    const { id } = useParams()
    const book = books.find(book => book.id === Number(id))

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-auto">
            <DetailsHeader book={book} setBooks={setBooks} setIsEditPopupOpen={setIsEditPopupOpen} />
            <DetailsHero title={book.title} author={book.author} cover={book.cover} status={book.status} />
            <ProgressCard currentPage={book.currentPage} totalPages={book.totalPages} setIsEditPopupOpen={setIsEditPopupOpen} />
            <BookInfoCard genre={book.genre} totalPages={book.totalPages} dateAdded={book.dateAdded} />
            <div className="mt-8 mx-6">
                <div className="flex justify-between">
                    <h2 className="text-espreso h4">Reading Activity</h2>
                    <button className="text-taupe text-body-sm">Show more</button>
                </div>
                <ReadingActivityCard />
            </div>
            <div className="mt-8 mx-6 pb-6">
                <div className="flex justify-between">
                    <h2 className="text-espreso h4">Personal notes</h2>
                    <button className="text-taupe text-body-sm">Show more</button>
                </div>
                <PersonalNotesCard />
            </div>

            { isEditPopupOpen &&
                <EditDetails id={book.id} title={book.title} author={book.author} genre={book.genre} cover={book.cover} status={book.status} currentPage={book.currentPage} totalPages={book.totalPages} setBooks={setBooks} setIsEditPopupOpen={setIsEditPopupOpen} />
            }
        </div>
    )
}