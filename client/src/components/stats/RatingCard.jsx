import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, ArrowRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import Modal from "../shared/Modal"
import HorizontalDivider from "../shared/HorizontalDivider"

export default function RatingCard({ totalFilteredBooks, ratingDistribution, totalRatedBooks, rating }) {
    const navigate = useNavigate()
    const [showRatings, setShowRatings] = useState(false)

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h2 className="h4 text-espresso">Rating</h2>
                { totalRatedBooks > 0 &&
                    <p className="text-body-sm text-taupe cursor-pointer hover:text-espresso transition-all duration-300"
                        onClick={() => setShowRatings(true)}
                    >
                        View {totalRatedBooks} {totalRatedBooks > 1 ? "ratings" : "rating"}
                    </p>
                }
            </div>
            
            <div className="mt-5 text-center">
                <p className="h1 text-espresso">
                    {rating} <span className="text-body text-taupe font-normal">/ 5</span>
                </p>
                
                <div className="w-full mt-2 flex items-center justify-center gap-1">
                    <span className={`h5 ${Math.floor(rating) >= 1 ? "text-espresso" : "text-tan"}`}>★</span>
                    <span className={`h4 ${Math.floor(rating) >= 2 ? "text-espresso" : "text-tan"}`}>★</span>
                    <span className={`h3 ${Math.floor(rating) >= 3 ? "text-espresso" : "text-tan"}`}>★</span>
                    <span className={`h4 ${Math.floor(rating) >= 4 ? "text-espresso" : "text-tan"}`}>★</span>
                    <span className={`h5 ${Math.floor(rating) === 5 ? "text-espresso" : "text-tan"}`}>★</span>
                </div>

                <p className="text-body-xs text-taupe mt-2">
                    {totalRatedBooks} of {totalFilteredBooks} rated
                </p>
            </div>

            <HorizontalDivider customClasses="mt-4" />

            <div className="mt-4 flex flex-col gap-2">
                {
                    ratingDistribution.toReversed().map(r => (
                        <div className="flex items-center gap-3">
                            <p className="text-body-sm text-coffee w-20">
                                {r.rating} {r.rating > 1 ? "stars" : "star"}
                            </p>

                            <div className="w-full h-1.5 bg-tan rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-espresso rounded-full"
                                    style={{ width: `${r.percent}%` }}
                                />
                            </div>

                            <p className="text-body-sm text-coffee w-12 text-right">{r.percent}%</p>
                        </div>
                    ))
                }
            </div>

            { showRatings &&
                <Modal>
                    <div className="w-full flex justify-between">
                        <h1 className="h2 text-espresso">All ratings</h1>
                
                        <HugeiconsIcon 
                            icon={Cancel01Icon} 
                            size={24} 
                            strokeWidth={1.5} 
                            className="cursor-pointer text-taupe hover:text-espresso transition-all duration-300"
                            onClick={() => setShowRatings(false)}
                        />
                    </div>

                    <p className="text-body text-coffee mt-2">Browse all the books you've rated, grouped by rating.</p>

                    <div className="flex flex-col gap-4 mt-5">
                        { ratingDistribution
                            .toReversed()
                            .filter(r => r.count > 0)
                            .map(r => (
                                <div key={r.rating}>
                                    <p className="h5 text-espresso">
                                        {r.rating} {r.rating > 1 ? "stars" : "star"} <span className="text-taupe font-normal">({r.count})</span>
                                    </p>

                                    <div className="flex flex-col gap-3 mt-3">
                                        { r.books.map(book => (
                                            <div
                                                key={book.id}
                                                onClick={() => navigate(`/book/${book.id}`)}
                                                className="cursor-pointer flex justify-between gap-3 items-center"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={book.cover}
                                                        alt=""
                                                        className="w-8 aspect-5/8 rounded-[4px]"
                                                    />

                                                    <p className="text-body text-coffee">
                                                        {book.title}
                                                    </p>
                                                </div>

                                                <HugeiconsIcon
                                                    icon={ArrowRight01Icon}
                                                    size={20}
                                                    strokeWidth={1.25}
                                                    className="text-taupe"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Modal>
            }
        </div>
    )
}