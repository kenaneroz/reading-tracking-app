import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, MoreVerticalIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export default function DetailsHeader({ book, setBooks, updateBook, deleteBook, setIsEditPopupOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const navigate = useNavigate()

    function returnHome() {
        navigate("/")
    }

    async function handleDelete() {
        try {
            await deleteBook(book._id)

            setBooks(prev => prev.filter(b => b._id !== book._id))

            setConfirmDelete(false)

            navigate("/")
        } catch (error) {
            console.log(error.message)
        }
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
                <ConfirmDeletePopup 
                    cancel={() => setConfirmDelete(false)} 
                    delete_={handleDelete} 
                    message="Are you sure you want to delete this book? This action cannot be undone." 
                />
            }
        </div>
    )
}