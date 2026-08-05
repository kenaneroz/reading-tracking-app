import { useNavigate } from 'react-router-dom'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

export default function LongestStreak({ id, streak }) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center"
            onClick={() => navigate(`/book/${id}`)}
        >
            <div>
                <p className="text-body-sm text-taupe">Longest streak</p>
                <p className="h1 text-espresso mt-4">{streak} <span className="text-taupe text-body">{streak > 1 ? "days" : "day"}</span></p>
            </div>

            <HugeiconsIcon 
                icon={ArrowRight01Icon} 
                size={16} 
                strokeWidth={1} 
                className="text-taupe"
            />
        </div>
    )
}