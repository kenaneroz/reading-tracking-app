import BookCard from "./BookCard"


export default function BookCarousel({ filteredBooks }) {

    return (
        <div
            className="flex gap-4 items-center overflow-x-scroll mt-4"
        >
            {
                filteredBooks.length > 0
                ?
                filteredBooks.map((book, index) => (
                    <BookCard 
                        key={book.id}
                        cover={book.cover}
                        title={book.title}
                        totalPages={book.totalPages}
                        currentPage={book.currentPage}
                        isFirst={index === 0}
                    />
                ))
                :
                <p className="text-body-sm text-espresso pt-4 w-full text-center">Nothing found.</p>
            }
        </div>
    )
}