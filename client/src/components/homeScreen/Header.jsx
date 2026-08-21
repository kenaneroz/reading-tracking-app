import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HugeiconsIcon } from "@hugeicons/react";
import { 
    AccountSetting01Icon, 
    ArrowRight01Icon, 
    ArrowRightFromLineIcon, 
    Search02Icon,
    Cancel01Icon
} from "@hugeicons/core-free-icons";

import HorizontalDivider from "../shared/HorizontalDivider"

import { useAuth } from "../../context/authContext"

export default function Header({ 
    isSearchBoxVisible, 
    setSearchBoxVisibility, 
    setActiveStatusFilter, 
    setSearchValue 
}) {   
    const { user, logout, loading } = useAuth()
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false)

    const navigate = useNavigate()

    function showSearchBox() {
        setSearchBoxVisibility(true)
        setActiveStatusFilter("All")
    }

    function hideSearchBox() {
        setSearchBoxVisibility(false)
        setSearchValue("")
    }

    if (loading) {
        return <div className="skeleton-loader"></div>
    }

    return (
        <header className="p-6 pt-16 flex justify-between items-center bg-espresso rounded-b-3xl">
            <div className="flex items-center gap-3">
                <img 
                    src={user.profilePhoto || "/default-avatar.png"}
                    alt="Profile photo" 
                    className="w-11 h-11 rounded-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setIsProfilePopupOpen(prev => !prev)}
                />

                <div>
                    <p className="text-body text-cream/60">Hello, {user.name} 👋 </p>
                    <h1 className="h3 text-cream pt-1">Welcome back!</h1>    
                </div>                
            </div>

            {isProfilePopupOpen &&
                <div className="w-60 bg-beige border border-tan p-4 rounded-[20px] absolute left-5 top-40 z-50">
                    <div className="flex items-center gap-3">
                        <img 
                            src={user.profilePhoto || "/default-avatar.png"}
                            alt="Profile photo" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-cream"
                        />

                        <p className="text-espresso"><span className="text-[20px] font-regular">{user.name}</span> <span className="h4">{user.surname}</span> </p>
                    </div>

                    <HorizontalDivider className="mt-4" />

                    <div className="mt-4 flex flex-col gap-4">
                        <div 
                            className="flex items-center justify-between px-1 py-2 cursor-pointer"
                            onClick={() => navigate("/edit-profile")}
                        >
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon 
                                    icon={AccountSetting01Icon} 
                                    size={20} 
                                    strokeWidth={1.5} 
                                    className="text-coffee"
                                />  
                                <p className="h4 font-medium text-espresso">Edit profile</p>
                            </div>

                            <HugeiconsIcon 
                                icon={ArrowRight01Icon} 
                                size={16} 
                                strokeWidth={1} 
                                className="text-taupe"
                            />                              
                        </div>

                        <div 
                            className="flex items-center gap-3 px-1 py-2 cursor-pointer"
                            onClick={logout}
                        >
                            <HugeiconsIcon 
                                icon={ArrowRightFromLineIcon} 
                                size={20} 
                                strokeWidth={1.5} 
                                className="text-coffee"
                            />  
                            <p className="h4 font-medium text-espresso">Log out</p>
                        </div>
                    </div>
                </div>
            }

            {isSearchBoxVisible 
                ? <button
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
                : <button
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
