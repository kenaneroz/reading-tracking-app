import ProgressBar from "./ProgressBar"
import PrimaryButton from "./PrimaryButton"

export default function RecentlyTrackingCard({ cover, title, author, currentPage, totalPages, showPositionUpdatePopup  }) {
    return (
        <div
            className="flex gap-4 items-center bg-beige rounded-[20px] p-5 border border-tan mt-4"
        >
            <img 
                src={cover}
                alt=""
                className="w-20 aspect-5/8 rounded-[10px] object-cover cursor-pointer"
            />

            <div className="flex-1">
                <div>
                    <h3 className="h5 text-espresso">{title}</h3>
                    <p className="text-body-sm text-taupe mt-1">{author}</p>
                </div>

                <div
                    className="flex justify-between items-center mt-4"
                >
                    <div>
                        <p
                            className="text-body-sm text-taupe"
                        >Current position</p>
                        <p
                            className="text-body text-espresso font-semibold mt-1"
                        >Page {currentPage || 0}</p>
                    </div>

                    <div>
                        <p
                            className="text-body-sm text-taupe"
                        >Remaining</p>
                        <p
                            className="text-body text-espresso font-semibold mt-1"
                        >{totalPages - currentPage} pages</p>
                    </div>
                </div>

                <div
                    className="mt-3"
                >
                    <ProgressBar 
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    <p
                        className="text-body-sm text-taupe mt-2"
                    >{Math.floor((currentPage / totalPages) * 100)}% completed</p>
                </div>

                <div className="mt-4">
                    <PrimaryButton
                        onClick={showPositionUpdatePopup}
                        label="Update progress"
                    />
                </div>
            </div>
        </div>
    )
}