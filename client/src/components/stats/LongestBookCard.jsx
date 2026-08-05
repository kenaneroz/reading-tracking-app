import { useNavigate } from 'react-router-dom'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

export default function LongestBookCard({ id, cover, title, totalPages }) {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center"
            onClick={() => navigate(`/book/${id}`)}
        >
            <div className="">
                <p className="text-body-sm text-taupe">Longest book</p>
                
                <div className="flex items-center gap-3 mt-4">
                    <img 
                        src={cover} 
                        alt="" 
                        className="w-10 aspect-5/8 rounded-[4px]"
                    />

                    <div className="">
                        <p className="h5 text-espresso">{title}</p>
                        <p className="text-body-sm text-taupe">{totalPages} {totalPages > 1 ? "pages" : "page"}</p>
                    </div>
                </div>
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