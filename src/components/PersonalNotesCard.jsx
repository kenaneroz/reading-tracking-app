
export default function PersonalNotesCard({ note, page, date }) {
    const date_ = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "2-digit" })

    return (
        <div className="border-l-[3px] border-tan pl-3 py-1">
            <p className="text-coffee text-body">“{note}”</p>
            <div className="flex gap-2 mt-1">
                <p className="text-taupe text-body-xs">p. {page}</p>
                <p className="text-taupe text-body-xs">{date_}</p>
            </div>
        </div>
    )
} 