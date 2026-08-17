import { useEffect, useState } from "react"
import Header from "../components/homeScreen/Header"
import StatusFilter from "../components/homeScreen/StatusFilter"
import BookCarousel from "../components/homeScreen/BookCarousel"
import SortControl from "../components/homeScreen/SortControl"
import Input from "../components/shared/form/Input"
import RecentlyTrackingCard from "../components/homeScreen/RecentlyTrackingCard"
import BottomNavigation from "../components/shared/BottomNavigation"
import AddBook from "../components/shared/AddBook"
import { HugeiconsIcon } from "@hugeicons/react";
import { GalleryHorizontalEndIcon, Search02Icon } from "@hugeicons/core-free-icons";

import { getBookStatus } from "../utils/bookUtils.js"

export default function HomeScreen({ books, setBooks, loading }) {
    const [activeStatusFilter, setActiveStatusFilter] = useState("All")
    const [isSortControlVisible, setIsSortControlVisible] = useState(false)
    const [activeSortControl, setActiveSortControl] = useState("Recently added")
    const [searchValue, setSearchValue] = useState("")
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false)

    const [recentlyTrackingBook, setRecentlyTrackingBook] = useState(() =>
        books && books.length > 0
            ? books.reduce((latest, book) => (book.updatedAt > latest.updatedAt ? book : latest))
            : null
    )

    useEffect(() => {
        if (!books || books.length === 0) return
        setRecentlyTrackingBook(() =>
            books.reduce((latest, book) => (book.updatedAt > latest.updatedAt ? book : latest))
        )
    }, [books])


    if (loading) return <span></span>

    const lowerCaseSearchValue = searchValue.toLowerCase()
    const filteredBooks = books
        .filter(book => activeStatusFilter === "All" || getBookStatus(book.currentPage, book.totalPages) === activeStatusFilter)
        .filter(book =>
            book.title.toLowerCase().includes(lowerCaseSearchValue) ||
            book.author.toLowerCase().includes(lowerCaseSearchValue)
        )
        .sort((a, b) => {
            if (activeSortControl === "Recently added") {
                return b.createdAt - a.createdAt
            }
            if (activeSortControl === "Title A-Z") {
                return a.title.localeCompare(b.title)
            }
            if (activeSortControl === "Progress") {
                return (b.currentPage / b.totalPages) - (a.currentPage / a.totalPages)
            }
            return 0
        })


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
                <section className="px-6 pt-6 pb-5">
                    <h2 className="h4 text-espresso">Your library</h2>

                    {isSearchBoxVisible ? (
                        <Input
                            placeholder="Search by a book or author name"
                            icon={Search02Icon}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    ) : (
                        <StatusFilter
                            activeStatusFilter={activeStatusFilter}
                            onStatusFilterChange={setActiveStatusFilter}
                        />
                    )}
                </section>

                <section className="px-6 pt-5 pb-7">
                    <div
                        className="flex justify-between items-end relative"
                        onClick={() => setIsSortControlVisible(prev => !prev)}
                    >
                        <p className="text-body-sm text-taupe w-full">
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

                        {isSortControlVisible && (
                            <SortControl
                                activeSortControl={activeSortControl}
                                onSortControlChange={setActiveSortControl}
                            />
                        )}
                    </div>
                    
                    {
                        (books && books.length > 0) &&
                        <BookCarousel
                            filteredBooks={filteredBooks}
                            activeStatusFilter={activeStatusFilter}
                        />
                    }
                </section>

                <section className="px-4 pb-6">
                    <h2 className="h4 text-espresso">Latest activity</h2>

                    { recentlyTrackingBook ?
                        <RecentlyTrackingCard
                            id={recentlyTrackingBook._id}
                            title={recentlyTrackingBook.title}
                            author={recentlyTrackingBook.author}
                            cover={recentlyTrackingBook.cover}
                            currentPage={recentlyTrackingBook.currentPage}
                            totalPages={recentlyTrackingBook.totalPages}
                            setBooks={setBooks}
                        /> :
                        <span></span>
                    }
                </section>
            </div>

            <BottomNavigation
                books={books}
                setBooks={setBooks}
            />
        </div>
    )
}