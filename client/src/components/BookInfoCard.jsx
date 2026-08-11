import HorizontalDivider from "../components/shared/HorizontalDivider.jsx"

export default function BookInfoCard({ genre, totalPages, rating, format, createdAt }) {
    const date = new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

    return (
        <div className="bg-beige p-5 rounded-[20px] border border-tan flex flex-col gap-5 mt-6 mx-6">
            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Total Pages</p>
                <p className="text-espresso font-semibold text-body-sm">{totalPages}</p>
            </div>

            <HorizontalDivider />

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Genre</p>
                <p className="text-espresso font-semibold text-body-sm">{genre}</p>
            </div>

            <HorizontalDivider />

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Rating</p>
                <p className="text-espresso font-semibold text-body-sm">{(rating && rating !== "Not rated") ? rating : "Not rated yet"}</p>
            </div>

            <HorizontalDivider />

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Format</p>
                <p className="text-espresso font-semibold text-body-sm">{format}</p>
            </div>

            <HorizontalDivider />

            <div className="flex justify-between">
                <p className="text-taupe text-body-sm">Date added</p>
                <p className="text-espresso font-semibold text-body-sm">{date}</p>
            </div>
        </div>
    )
}