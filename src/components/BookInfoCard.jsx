export default function BookInfoCard({ genre, totalPages, dateAdded }) {
    const date = new Date(dateAdded).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "2-digit" })

    return (
        <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5 mt-6 mx-6">
            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Total Pages</p>
                <p className="text-espresso font-semibold text-body-sm">{totalPages}</p>
            </div>

            <div className="w-full border-t border-tan/80"></div>

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Genre</p>
                <p className="text-espresso font-semibold text-body-sm">{genre}</p>
            </div>

            <div className="w-full border-t border-tan/80"></div>

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Date added</p>
                <p className="text-espresso font-semibold text-body-sm">{date}</p>
            </div>
        </div>
    )
}