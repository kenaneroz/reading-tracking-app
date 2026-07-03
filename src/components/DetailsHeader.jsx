import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, MoreVerticalIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DetailsHeader({ book, setBooks, setIsEditPopupOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigate = useNavigate()
    function handleDelete() {
        setBooks(prev => prev.filter(b => b.id !== book.id))
        setIsMenuOpen(false)
        navigate("/")
    }

    function returnHome() {
        navigate("/")
    }

    return (
        <div className="flex justify-between items-center fixed left-6 right-6 top-6 z-50">
            <button className="cursor-pointer text-cream"
                onClick={returnHome}
            >
                <HugeiconsIcon icon={ArrowLeft02Icon} size={24} strokeWidth={1.5} />
            </button>
  
            { isMenuOpen ?
                <button className="cursor-pointer text-cream"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.5} />
                </button>
                :
                <button className="cursor-pointer text-cream"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <HugeiconsIcon icon={MoreVerticalIcon} size={24} strokeWidth={1.5} />
                </button>
            }
            
            
            { isMenuOpen &&
                <div className="absolute right-6 top-10 flex flex-col items-end gap-3 bg-beige p-4 rounded-2xl border border-tan">
                    <button className="cursor-pointer text-body text-espresso hover:font-semibold transition-all duration-300"
                        onClick={handleDelete}
                    >Delete</button>
                    <button className="cursor-pointer text-body text-espresso hover:font-semibold transition-all duration-300"
                        onClick={() => setIsEditPopupOpen(true)}
                    >Edit</button>
                </div>
            }
        </div>
    )
}