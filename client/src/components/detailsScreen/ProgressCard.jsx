import ProgressBar from "../shared/ProgressBar"
import Button from "../shared/Button"

export default function ProgressCard({ currentPage, totalPages, setIsEditPopupOpen }) {
    return (
        <div className="bg-beige p-5 rounded-[20px] mx-6 mt-8 border border-tan">
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-body-sm text-taupe">Current position</p>
                    <p className="text-body text-espresso font-semibold mt-1">Page {currentPage}</p>
                </div>

                <div className="text-end">
                    <p className="text-body-sm text-taupe">Remaining</p>
                    <p className="text-body text-espresso font-semibold mt-1">{totalPages - currentPage} pages</p>
                </div>
            </div>

            <div className="mt-4">
                <ProgressBar currentPage={currentPage} totalPages={totalPages} />
                <p className="text-body-sm text-taupe mt-2">{Math.floor((currentPage / totalPages) * 100)}% completed</p>
            </div>

            <div className="mt-4">
                <Button onClick={() => setIsEditPopupOpen(true)}>
                    <span>Update progress</span>
                </Button>
            </div>
        </div>
    )
}