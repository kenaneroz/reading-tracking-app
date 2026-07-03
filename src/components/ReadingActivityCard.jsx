import ProgressBar from "./ProgressBar"

export default function ReadingActivityCard() {
    return (
        <div className="mt-4">
            <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <p className="text-taupe text-body-sm shrink-0">June 24, 26</p>
                    <div className="flex-1"><ProgressBar currentPage={0} totalPages={300} /></div>
                    <div className="shrink-0 text-right">
                        <p className="text-espresso font-semibold text-body-sm">p. 24</p>
                        <p className="text-taupe text-body-sm whitespace-nowrap mt-1">+24 pages</p>
                    </div>
                </div>

                <div className="w-full border-t border-tan/80"></div>

                <div className="flex items-center gap-4">
                    <p className="text-taupe text-body-sm shrink-0">June 24, 26</p>
                    <div className="flex-1"><ProgressBar currentPage={0} totalPages={300} /></div>
                    <div className="shrink-0 text-right">
                        <p className="text-espresso font-semibold text-body-sm">p. 24</p>
                        <p className="text-taupe text-body-sm whitespace-nowrap mt-1">+24 pages</p>
                    </div>
                </div>
            </div>

            <div className="bg-beige p-4 rounded-[14px] border border-tan flex gap-4 mt-4 items-center">
                <div className="flex-1 text-center">
                    <p className="text-body-sm text-taupe">Reading days</p>
                    <p className="h5 text-espresso mt-1">3</p>
                </div>

                <div className="w-px h-10 bg-tan"></div>

                <div className="flex-1 text-center">
                    <p className="text-body-sm text-taupe">Avg. pages / day</p>
                    <p className="h5 text-espresso mt-1">34</p>
                </div>
            </div>
        </div>
    )
}