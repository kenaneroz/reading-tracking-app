import { useNavigate } from 'react-router-dom'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

export default function LongestBookCard({ book }) {
    const navigate = useNavigate()

    return (
        <>
            <p className="text-body-sm text-taupe">Longest book</p>
            { book 
                ? <div className="flex justify-between items-center"
                    onClick={() => navigate(`/book/${book._id}`)}
                >
                    <div className="flex items-center gap-3 mt-4">
                        <img 
                            src={book.cover} 
                            alt="" 
                            className="w-10 aspect-5/8 rounded-[4px]"
                        />

                        <div className="">
                            <p className="h5 text-espresso">{book.title}</p>
                            <p className="text-body-sm text-taupe">{book.totalPages} {book.totalPages > 1 ? "pages" : "page"}</p>
                        </div>
                    </div>

                    <HugeiconsIcon 
                        icon={ArrowRight01Icon} 
                        size={16} 
                        strokeWidth={1} 
                        className="text-taupe"
                    />
                </div>
                : <div className="mt-4 text-center">
                    <p className="text-body-sm text-coffee font-medium">No books yet</p>
                    <p className="mt-1 text-body-sm text-taupe">
                        Add books to discover the longest book in your library.
                    </p>
                </div>
            }
        </>
    )


}