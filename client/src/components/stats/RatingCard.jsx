import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"

import HorizontalDivider from "./HorizontalDivider"

export default function RatingCard({ totalBooks, ratingDistribution, totalRatedBooks, rating }) {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h2 className="h4 text-espresso">Rating</h2>
                { totalRatedBooks > 0 &&
                    <p className="text-body-sm text-taupe">
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
                    {totalRatedBooks} of {totalBooks} rated
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
        </div>
    )
}