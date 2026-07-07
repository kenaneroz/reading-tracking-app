import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, MoreVerticalIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DetailsHeader({ book, setBooks, setIsEditPopupOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()
    function handleDelete() {
        setConfirmDelete(false)
        setBooks(prev => prev.filter(b => b.id !== book.id))
        setIsMenuOpen(false)
        navigate("/")
    }

    function returnHome() {
        navigate("/")
    }

    return (
        <div className="w-full flex justify-between items-center absolute left-0 z-50 px-6 pt-6">
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
                <div className="absolute right-6 top-14 flex flex-col items-end gap-3 bg-beige p-4 rounded-2xl border border-tan">
                    <button className="cursor-pointer text-body text-taupe hover:text-espresso transition-all duration-300"
                        onClick={() => {
                            setIsMenuOpen(false)
                            setConfirmDelete(true)
                        }}
                    >Delete</button>
                    <button className="cursor-pointer text-body text-taupe hover:text-espresso transition-all duration-300"
                        onClick={() => {
                            setIsMenuOpen(false)
                            setIsEditPopupOpen(true)
                        }}
                    >Edit</button>
                </div>
            }


            { confirmDelete &&
                <div className="fixed inset-0 bg-espresso/40 z-50 flex items-center justify-center md:max-w-[440px] md:max-h-[956px]">
                    <div className="p-6 bg-beige border border-tan rounded-[20px] mx-6 text-center">
                        <p className="text-espresso h4">Are you sure?</p>
                        <p className="text-coffee text-body-sm mt-1">Are you sure you want to delete this book? This action cannot be undone.</p>
                        <div className="flex gap-3 mt-6">
                            <button type="button" 
                                className="flex-1 text-espresso py-3 rounded-xl cursor-pointer text-body hover:bg-cream transition-all duration-300"
                                onClick={() => setConfirmDelete(false)}
                            >Cancel</button>
                            <button type="button" 
                                className="flex-1 bg-danger text-cream py-3 rounded-xl cursor-pointer text-body hover:bg-danger/80 transition-all duration-300"
                                onClick={handleDelete}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}