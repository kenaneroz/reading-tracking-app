import { useNavigate } from 'react-router-dom'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

export default function LongestStreak({ totalBooks, id, streak }) {
    const navigate = useNavigate()

    return (
        <>
            <p className="text-body-sm text-taupe">Longest streak</p>
            { totalBooks > 0 
                ? <div className="flex justify-between items-center"
                    onClick={() => navigate(`/book/${id}`)}
                >
                    <p className="h1 text-espresso mt-4">{streak} <span className="text-taupe text-body font-normal">{streak > 1 ? "days" : "day"}</span></p>

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
                        Start logging your reading to build your reading streak.
                    </p>
                </div>
            }
        </>
    )
}