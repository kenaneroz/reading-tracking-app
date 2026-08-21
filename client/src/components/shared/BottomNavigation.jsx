import { use, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { HugeiconsIcon } from "@hugeicons/react"
import {
    Home05Icon,
    PieChart02Icon,
    Add01Icon
} from "@hugeicons/core-free-icons"

import AddBook from "./AddBook"

import { useBooks } from "../../context/BookContext"

function NavItem({ icon, label, isActive, onClick }) {
    return (
        <button
            className={`${isActive ? "text-espresso" : "text-taupe"} flex-1 flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-beige/60 hover:text-espresso transition-all duration-300 p-2 rounded-3xl`}
            onClick={onClick}
        >
            <HugeiconsIcon icon={icon} size={24} strokeWidth={1.5} />
            <span className="text-body-xs">{label}</span>
        </button>
    )
}

export default function BottomNavigation() {
    const { boook, setBooks } = useBooks()
    const [isAddBookPopupActive, setIsAddBookPopupActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    const isHomeActive = location.pathname === "/home"
    const isStatisticsActive = location.pathname === "/statistics"

    return (
        <nav className="w-full px-6 py-4 flex gap-4 justify-between items-end bg-cream border-t border-tan">
            <NavItem
                icon={Home05Icon}
                label="Home"
                isActive={isHomeActive}
                onClick={() => navigate("/home")}
            />

            <button
                className="bg-espresso text-cream rounded-3xl w-14 h-14 flex justify-center items-center cursor-pointer hover:bg-espresso/90 transition-all duration-300"
                onClick={() => setIsAddBookPopupActive(true)}
            >
                <HugeiconsIcon icon={Add01Icon} size={24} strokeWidth={1.5} />
            </button>

            <NavItem
                icon={PieChart02Icon}
                label="Statistics"
                isActive={isStatisticsActive}
                onClick={() => navigate("/statistics")}
            />

            { isAddBookPopupActive &&
                <AddBook setIsAddBookPopupActive={setIsAddBookPopupActive} />
            }
        </nav>
    )
}