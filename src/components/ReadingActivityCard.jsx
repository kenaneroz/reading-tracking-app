import ProgressBar from "./ProgressBar"

export default function ReadingActivityCard({ readingActivity, currentPage, totalPages }) {

    return (
        <div className="mt-4">
            <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5">
                {
                    readingActivity.map((r, index) => (
                        <div className={`flex items-center gap-4 ${(index + 1) === readingActivity.length ? "" : "border-b border-tan pb-4"}`} >
                            <p className="text-taupe text-body-sm shrink-0">{new Date(r.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "2-digit" })}</p>
                            <div className="flex-1"><ProgressBar currentPage={r.currentPage} totalPages={totalPages} /></div>
                            <div className="shrink-0 text-right">
                                <p className="text-espresso font-semibold text-body-sm">p. {r.currentPage}</p>
                                <p className="text-taupe text-body-sm whitespace-nowrap mt-1">+{Number(r.currentPage) - Number(r.previousPage)} pages</p>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className="bg-beige p-4 rounded-[14px] border border-tan flex gap-4 mt-4 items-center">
                <div className="flex-1 text-center">
                    <p className="text-body-sm text-taupe">Reading days</p>
                    <p className="h5 text-espresso mt-1">{readingActivity.length}</p>
                </div>

                <div className="w-px h-10 bg-tan"></div>

                <div className="flex-1 text-center">
                    <p className="text-body-sm text-taupe">Avg. pages / day</p>
                    <p className="h5 text-espresso mt-1">{Number(currentPage) / readingActivity.length}</p>
                </div>
            </div>
        </div>
    )
}