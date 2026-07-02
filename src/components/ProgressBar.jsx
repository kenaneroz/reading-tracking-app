export default function ProgressBar({ totalPages, currentPage }) {
    return (
        <div
            className="w-full h-[6px] bg-tan rounded-[2.5px] mt-4"
        >
            <div
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
                className="h-full bg-espresso rounded-[2.5px]"
            ></div>
        </div>
    )
}