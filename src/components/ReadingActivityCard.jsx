import ProgressBar from "./ProgressBar"

export default function ReadingActivityCard({ readingActivity, currentPage, totalPages }) {
    const uniqueDays = new Set(
        readingActivity.map(activity => 
            new Date(activity.date).toDateString()
        )
    )
    const countReadingDays = uniqueDays.size

    return (
        <div className="mt-4">
            {
                readingActivity.length === 0 ?
                <p className="text-taupe text-body-sm text-center">
                    You do not have any reading activities yet
                </p>
                :
                <>
                <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5">
                    {
                        readingActivity.slice().reverse().slice(0, 3).map((r, index) => (
                            <div className={`flex items-center gap-4 ${(index + 1) === readingActivity.slice(0, 3).length ? "" : "border-b border-tan pb-4"}`} >
                                <div className="shrink-0">
                                    <p className="text-espresso font-medium text-body-sm ">{new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                                    <p className="mt-1 text-taupe text-body-xs">{new Date(r.date).getFullYear()}</p>
                                </div>
                                <div className="flex-1"><ProgressBar currentPage={r.currentPage} totalPages={totalPages} /></div>
                                <div className="shrink-0 text-right">
                                    <p className="text-espresso font-medium  text-body-sm whitespace-nowrap">+{Number(r.currentPage) - Number(r.previousPage)} pages</p>
                                    <p className="text-taupe text-body-xs mt-1">p. {r.currentPage}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="bg-beige p-4 rounded-[14px] border border-tan flex gap-4 mt-4 items-center">
                    <div className="flex-1 text-center">
                        <p className="text-body-sm text-taupe">Reading days</p>
                        <p className="h5 text-espresso mt-1">{countReadingDays}</p>
                    </div>

                    <div className="w-px h-10 bg-tan"></div>

                    <div className="flex-1 text-center">
                        <p className="text-body-sm text-taupe">Avg. pages / day</p>
                        <p className="h5 text-espresso mt-1">{readingActivity.length === 0 ? "0" : Math.floor(Number(currentPage) / countReadingDays)}</p>
                    </div>
                </div>
                </>
            }

        </div>
    )
}