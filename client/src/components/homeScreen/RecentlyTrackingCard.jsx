import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProgressBar from "../shared/ProgressBar"
import Button from "../shared/Button"
import Modal from "../shared/Modal"
import PositionUpdatePopup from "../shared/PositionUpdatePopup"

export default function RecentlyTrackingCard({ book }) {
    const [isPositionUpdatePopupActive, setIsPositionUpdatePopupActive] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isPositionUpdatePopupActive) {
            const scrollY = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"
        } else {
            const scrollY = document.body.style.top
            document.body.style.position = ""
            document.body.style.top = ""
            window.scrollTo(0, parseInt(scrollY || "0") * -1)
        }
    }, [isPositionUpdatePopupActive])

    function handleSelectedBook() {
        navigate(`/book/${book._id}`)
    }

    function showPositionUpdatePopup() {
        setIsPositionUpdatePopupActive(true)
    }

    const currentPage = book.currentPage || 0
    const totalPages = book.totalPages || 0
    const remainingPages = Math.max(0, totalPages - currentPage)
    const completedPercentage = totalPages > 0 
        ? Math.min(100, Math.floor((currentPage / totalPages) * 100)) 
        : 0

    return (
        <div className="flex gap-4 items-center bg-beige rounded-[20px] p-5 border border-tan mt-4">
            <img 
                src={book.cover}
                alt={book.title}
                className="w-20 aspect-5/8 rounded-[10px] object-cover cursor-pointer"
                onClick={handleSelectedBook}
            />

            <div className="flex-1">
                <div>
                    <h3 className="h5 text-espresso">{book.title}</h3>
                    <p className="text-body-sm text-taupe mt-1">{book.author}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-body-sm text-taupe">Current position</p>
                        <p className="text-body text-espresso font-semibold mt-1">
                            Page {currentPage}
                        </p>
                    </div>

                    <div>
                        <p className="text-body-sm text-taupe">Remaining</p>
                        <p className="text-body text-espresso font-semibold mt-1">
                            {remainingPages} pages
                        </p>
                    </div>
                </div>

                <div className="mt-3">
                    <ProgressBar 
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    <p className="text-body-sm text-taupe mt-2">
                        {completedPercentage}% completed
                    </p>
                </div>

                <div className="mt-4">
                    <Button onClick={showPositionUpdatePopup}>
                        <span>Update progress</span>
                    </Button>
                </div>
            </div>

            {isPositionUpdatePopupActive && (
                <Modal>
                    <PositionUpdatePopup
                        book={book}
                        setIsPositionUpdatePopupActive={setIsPositionUpdatePopupActive}
                    />
                </Modal>
            )}
        </div>
    )
}