import { useNavigate } from 'react-router-dom'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import EmptyState from './EmptyState'

export default function LongestStreak({ totalFilteredBooks, id, streak }) {
    const navigate = useNavigate()

    return (
        <>
            <p className="text-body-sm text-taupe">Longest streak</p>
            { totalFilteredBooks > 0 
                ? <div className="flex justify-between items-center mt-4"
                    onClick={() => navigate(`/book/${id}`)}
                >
                    <p className="h1 text-espresso">{streak} <span className="text-taupe text-body font-normal">{streak > 1 ? "days" : "day"}</span></p>

                    <HugeiconsIcon 
                        icon={ArrowRight01Icon} 
                        size={16} 
                        strokeWidth={1} 
                        className="text-taupe"
                    />
                </div>
                : <EmptyState customClasses="mt-4" />
            }
        </>
    )
}