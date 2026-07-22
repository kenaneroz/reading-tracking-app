import { HugeiconsIcon } from "@hugeicons/react";
import { Home05Icon, PieChart02Icon, Add01Icon } from "@hugeicons/core-free-icons";

import { useState } from "react";

export default function BottomNavigation({ setIsAddBookPopupActive }) {
    const [activeNavigationItem, setActiveNavigationItem] = useState("Home")

    function openAddBookPopup() {
        setIsAddBookPopupActive(true)
    }

    return (
        <nav className="w-full px-6 py-4 flex gap-4 justify-between items-end bg-cream border-t border-tan"> 
            <button className={`${activeNavigationItem === "Home" ? "text-espresso" : "text-taupe"} flex-1 flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-beige/60 hover:text-espresso transition-all duration-300 p-2 rounded-3xl`}>
                <HugeiconsIcon
                    icon={Home05Icon}
                    size={24} 
                    strokeWidth={1.5}
                />
                <span className="text-body-xs">Home</span>
            </button>

            <button 
                className="bg-espresso text-cream rounded-3xl w-14 h-14 flex justify-center items-center cursor-pointer hover:bg-taupe transition-all duration-300"
                onClick={openAddBookPopup}
            >
                <HugeiconsIcon
                    icon={Add01Icon}
                    size={24} 
                    strokeWidth={1.5}
                />
            </button>

            <button className={`${activeNavigationItem === "Statistics" ? "text-espresso" : "text-taupe"} flex-1 flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-beige/60 hover:text-espresso transition-all duration-300 p-2 rounded-3xl`}>
                <HugeiconsIcon
                    icon={PieChart02Icon}
                    size={24}
                    strokeWidth={1.5}
                />
                <span className="text-body-xs">Statistics</span>
            </button>
        </nav>
    )
}