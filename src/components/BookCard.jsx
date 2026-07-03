import ProgressBar from "./ProgressBar"
import { useNavigate } from "react-router-dom"

export default function BookCard({ id, title, cover, currentPage, totalPages, isFirst }) {
    const navigate = useNavigate()
    function handleSelectedBook() {
        navigate(`/book/${id}`)
    }

    return (
        <div className="rounded-2xl p-[10px] w-fit border border-tan cursor-pointer shrink-0"
            onClick={handleSelectedBook}
        >
            <img 
                src={cover}
                alt={`Cover of the book ${title}`}
                className={`${isFirst ? "w-[130px]" : "w-[110px]"} aspect-5/8 rounded-[10px]`}
            />

            <ProgressBar 
                totalPages={totalPages} 
                currentPage={currentPage} 
            />
        </div>
    )
}