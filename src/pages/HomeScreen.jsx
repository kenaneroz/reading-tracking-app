import { useEffect, useState } from "react"
import Header from "../components/Header"
import StatusFilter from "../components/StatusFilter"
import BookCarousel from "../components/BookCarousel"
import { books as initialBooks } from "../data/books"
import SortControl from "../components/SortControl"
import TextInput from "../components/form/TextInput"
import RecentlyTrackingCard from "../components/RecentlyTrackingCard"
import PositionUpdatePopup from "../components/PositionUpdatePopup"
import BottomNavigation from "../components/BottomNavigation"
import AddBook from "../components/AddBook"

import { HugeiconsIcon } from "@hugeicons/react";
import { GalleryHorizontalEndIcon, Search02Icon } from "@hugeicons/core-free-icons";



export default function HomeScreen() {
    const [books, setBooks] = useState(initialBooks)

    const [activeStatusFilter, setActiveStatusFilter] = useState("All")
    const [isSortControlVisible, setIsSortControlVisible] = useState(false) 
    const [activeSortControl, setActiveSortControl] = useState("Recently added")
    
    const [searchValue, setSearchValue] = useState("")
    const lowerCaseSearchValue = searchValue.toLowerCase()
    const filteredBooks = books
        .filter(book => activeStatusFilter === "All" || book.status === activeStatusFilter)
        .filter(book => book.title.toLowerCase().includes(lowerCaseSearchValue) || book.author.toLowerCase().includes(lowerCaseSearchValue))
        .sort((a, b) => {
            if(activeSortControl === "Recently added") {
                return b.dateAdded - a.dateAdded
            }
            if(activeSortControl === "Title A-Z") {
                return a.title.localeCompare(b.title)
            } 
            if(activeSortControl === "Progress") {
                return (b.currentPage / b.totalPages) - (a.currentPage / a.totalPages)
            }
        })

    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false)
    
    const [recentlyTrackingBook, setRecentlyTrackingBook] = useState(() => books.reduce((latest, book) => {
        return book.updatedAt > latest.updatedAt ? book : latest
    })) 
    
    useEffect(() => {
        setRecentlyTrackingBook(() => books.reduce((latest, book) => {
            return book.updatedAt > latest.updatedAt ? book : latest
        }))
    }, [books])
   
    const [isPositionUpdatePopupActive, setIsPositionUpdatePopupActive] = useState(false)

    useEffect(() => {
        if (isPositionUpdatePopupActive) {
            const scrollY = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"
        } else {
            const scrollY = document.body.style.top
            document.body.style.position = ""
            document.body.style.top = ""
            window.scrollTo(0, parseInt(scrollY || "0") * -1)
        }
    }, [isPositionUpdatePopupActive])


    const [isAddBookPopupActive, setIsAddBookPopupActive] = useState(false)


    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col">
            {/* -–––*–––- */}
            <Header 
                isSearchBoxVisible={isSearchBoxVisible}
                setSearchBoxVisibility={setIsSearchBoxVisible}
                setActiveStatusFilter={setActiveStatusFilter}
                setSearchValue={setSearchValue}
            />

            <div className="flex-1 overflow-y-auto">
                <section
                    className="px-6 pt-6 pb-5"
                >
                    <h2 className="h4 text-espresso">Your library</h2>

                    {
                        isSearchBoxVisible
                        ?
                        <TextInput 
                            placeholder="Search by a book or author name"
                            icon={Search02Icon}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        :
                        <StatusFilter 
                            activeStatusFilter={activeStatusFilter}
                            onStatusFilterChange={setActiveStatusFilter}
                        />
                    }
                </section>
                
                <section
                    className="px-6 pt-5 pb-7"
                >
                    <div
                        className="flex justify-between items-end relative"
                        onClick={() => setIsSortControlVisible(prev => !prev)}
                    >
                        <p
                            className="text-body-sm text-taupe w-full"
                        >
                            {filteredBooks.length} {filteredBooks.length > 1 ? "books" : "book"} found
                        </p>

                        <button
                            type="button"
                            className="flex gap-2 items-center text-body-sm text-taupe cursor-pointer w-fit shrink-0"
                        >
                            {activeSortControl}
                            <HugeiconsIcon
                                icon={GalleryHorizontalEndIcon}
                                size={20}
                                strokeWidth={1.15}
                                className="rotate-180"
                            />
                        </button>

                        {
                            isSortControlVisible && 
                            <SortControl 
                                activeSortControl={activeSortControl}
                                onSortControlChange={setActiveSortControl}
                            />
                        }
                    </div>

                    <BookCarousel 
                        filteredBooks={filteredBooks}
                        activeStatusFilter={activeStatusFilter}
                    />
                </section>

                <section className="px-4 pb-6">
                    <h2 className="h4 text-espresso">Recently Tracking</h2>

                    <RecentlyTrackingCard
                        cover={recentlyTrackingBook.cover}
                        title={recentlyTrackingBook.title}
                        author={recentlyTrackingBook.author}
                        currentPage={recentlyTrackingBook.currentPage}
                        totalPages={recentlyTrackingBook.totalPages}
                        showPositionUpdatePopup={() => setIsPositionUpdatePopupActive(true)}
                    />

                    {
                        isPositionUpdatePopupActive &&
                        <PositionUpdatePopup 
                            id={recentlyTrackingBook.id}
                            status={recentlyTrackingBook.status}
                            currentPage={recentlyTrackingBook.currentPage}
                            totalPages={recentlyTrackingBook.totalPages}
                            setIsPositionUpdatePopupActive={setIsPositionUpdatePopupActive}
                            setBooks={setBooks}
                        />
                    }
                </section>
            </div>

            <BottomNavigation 
                setIsAddBookPopupActive={setIsAddBookPopupActive}
            />
            {
                isAddBookPopupActive &&
                <AddBook 
                    setIsAddBookPopupActive={setIsAddBookPopupActive}
                    books={books}
                    setBooks={setBooks}
                />
            }
        </div>
    )
} 