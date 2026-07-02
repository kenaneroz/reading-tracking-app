import ProgressBar from "./ProgressBar"

export default function BookCard({ cover, title, totalPages, currentPage, isFirst }) {
    return (
        <div className="rounded-2xl p-[10px] w-fit border border-tan cursor-pointer shrink-0">
            <img 
                src={cover}
                alt={`Cover of the book ${title}`}
                className={`${isFirst ? "w-[130px]" : "w-[110px]"} aspect-5/8 rounded-[10px]`}
            />

            <ProgressBar 
                totalPages={totalPages} 
                currentPage={currentPage} 
            />
        </div>
    )
}