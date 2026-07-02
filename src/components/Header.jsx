import { HugeiconsIcon } from "@hugeicons/react";
import { Search02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";

export default function Header({ isSearchBoxVisible, setSearchBoxVisibility, setActiveStatusFilter, setSearchValue }) {   
    function showSearchBox() {
        setSearchBoxVisibility(true)
        setActiveStatusFilter("All")
    }

    function hideSearchBox() {
        setSearchBoxVisibility(false)
        setSearchValue("")
    }


    return (
        <header className="p-6 pt-16 flex justify-between items-center bg-espresso rounded-b-3xl">
            <div className="flex items-center gap-3">
                <img 
                    src="/profile-photo.jpg" 
                    alt="Profile photo" 
                    className="w-11 h-11 rounded-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                />

                <div>
                    <p className="text-body text-cream/60">Hello, Ellison 👋 </p>
                    <h1 className="h3 text-cream pt-1">Welcome back!</h1>    
                </div>                
            </div>

            {
                isSearchBoxVisible 
                ?
                <button
                    type="button"
                    aria-label="Search"
                    className="bg-cream/20 text-cream w-11 h-11 rounded-[18px] flex justify-center items-center cursor-pointer hover:bg-cream/40 transition-all duration-300"
                    onClick={hideSearchBox}
                >
                        <HugeiconsIcon
                            icon={Cancel01Icon}
                            size={20}
                            strokeWidth={1.15}
                        />
                </button>
                :
                <button
                    type="button"
                    aria-label="Search"
                    className="bg-cream/20 text-cream w-11 h-11 rounded-[18px] flex justify-center items-center cursor-pointer hover:bg-cream/40 transition-all duration-300"
                    onClick={showSearchBox}
                >
                        <HugeiconsIcon
                            icon={Search02Icon}
                            size={20}
                            strokeWidth={1.15}
                        />
                </button>
            }

        </header>
    )
}