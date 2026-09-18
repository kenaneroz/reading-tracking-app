import { useState } from "react"
import Header from "../components/homeScreen/Header"
import StatusFilter from "../components/homeScreen/StatusFilter"
import BookCarousel from "../components/homeScreen/BookCarousel"
import SortControl from "../components/homeScreen/SortControl"
import Input from "../components/shared/form/Input"
import RecentlyTrackingCard from "../components/homeScreen/RecentlyTrackingCard"
import { HugeiconsIcon } from "@hugeicons/react"
import { GalleryHorizontalEndIcon, Search02Icon, DashboardSquare02Icon } from "@hugeicons/core-free-icons"

import { getBookStatus } from "../utils/bookUtils.js"

import { useBooks } from "../context/BookContext"
import BottomSheet from "../components/shared/BottomSheet.jsx"
import BookCard from "../components/homeScreen/BookCard.jsx"
import Button from "../components/shared/Button.jsx"
import ConfirmDeletePopup from "../components/shared/ConfirmDeletePopup.jsx"


export default function HomeScreen() {
    const { books, loading, deleteBooks } = useBooks()
    const [activeStatusFilter, setActiveStatusFilter] = useState("All")
    const [isSortControlVisible, setIsSortControlVisible] = useState(false)
    const [activeSortControl, setActiveSortControl] = useState("Recently added")
    const [searchValue, setSearchValue] = useState("")
    const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false)
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
    const [bookIdsToDelete, setBookIdsToDelete] = useState([])
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const recentlyTrackingBook =
        books && books.length > 0
            ? books.reduce((latest, book) => (book.updatedAt > latest.updatedAt ? book : latest))
            : null

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

    function toggleBook(id) {
        setBookIdsToDelete(prev => 
            prev.includes(id) 
                ? prev.filter(bookId => bookId !== id)
                : [...prev, id]
        )
    }

    async function handleMultipleDelete() {
        setIsDeleting(true)

        try {
            await deleteBooks(bookIdsToDelete)
            setBookIdsToDelete([])
            setIsConfirmDeleteOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            {isBottomSheetOpen &&
                <BottomSheet 
                    onClose={() => {
                        setBookIdsToDelete([])
                        setIsBottomSheetOpen(false)
                    }}
                    height="h-[85dvh]"
                    headerText={`${bookIdsToDelete.length} ${bookIdsToDelete.length > 1 ? "books" : "book"} selected`}
                >
                    {/* Search box */}
                    <div className="mt-5 shrink-0">
                        <Input
                            placeholder="Search by a book or author name"
                            icon={Search02Icon}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    {/* Books */}
                    <div className="mt-3 flex-1 min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-3">
                            {
                                filteredBooks.map(book => {
                                    return (
                                        <div 
                                            onClick={() => toggleBook(book._id)}
                                            className={`rounded-2xl p-[10px] w-fit border ${bookIdsToDelete.includes(book._id) ? "border-red" : "border-tan"} cursor-pointer shrink-0`}
                                        >
                                            <img 
                                                src={book.cover}
                                                alt={`Cover of the book ${book.title}`}
                                                className="w-full aspect-5/8 rounded-[10px]"
                                            />
                                        </div>
                                    )        
                                })
                            }
                        </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="shrink-0 flex flex-col gap-3 mt-3">
                        <div className="flex gap-3">
                            <Button 
                                variant="outline"
                                onClick={() => setBookIdsToDelete([])}
                                disabled={bookIdsToDelete.length === 0}
                                className="flex-2"
                            >
                                Clear
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => setBookIdsToDelete(books.slice(0, 50).map(book => book._id))}
                                disabled={bookIdsToDelete.length === 50 || bookIdsToDelete.length === books.length}
                                className="flex-3"
                            >
                                Select all <span className="font-normal text-espresso/80 text-body-xs">(up to 50)</span>
                            </Button>
                        </div>

                        <Button
                            variant="danger"
                            disabled={bookIdsToDelete.length === 0}
                            onClick={() => setIsConfirmDeleteOpen(true)}
                        >
                            {
                                bookIdsToDelete.length === 0
                                    ? "Delete"
                                    : `Delete ${bookIdsToDelete.length} ${bookIdsToDelete.length > 1 ? "books" : "book"}`
                            }
                        </Button>
                    </div>
                </BottomSheet>
            }

            {isConfirmDeleteOpen &&
                <ConfirmDeletePopup
                    cancel={() => setIsConfirmDeleteOpen(false)}
                    delete_={handleMultipleDelete}
                    message="This will permanently delete the selected books. This action cannot be undone."
                    isDeleting={isDeleting}
                />
            }

            <Header
                isSearchBoxVisible={isSearchBoxVisible}
                setSearchBoxVisibility={setIsSearchBoxVisible}
                setActiveStatusFilter={setActiveStatusFilter}
                setSearchValue={setSearchValue}
            />

            <div className="flex-1 overflow-y-auto">
                <section className="px-6 pt-6 pb-5">
                    <div className="flex justify-between items-center">
                        <h2 className="h4 text-espresso">Your library</h2>

                        <div 
                            onClick={() => setIsBottomSheetOpen(true)}
                            className="cursor-pointer flex items-center gap-2 group"
                        >
                            <p className="text-taupe text-body-sm group-hover:text-espresso transition-all duration-300">Manage library</p>

                            <HugeiconsIcon
                                icon={DashboardSquare02Icon}
                                size={20}   
                                strokeWidth={1.25}
                                className="text-taupe group-hover:text-espresso transition-all duration-300 ease-in-out"
                            />
                        </div>
                    </div>

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

                    { recentlyTrackingBook
                        ? <RecentlyTrackingCard book={recentlyTrackingBook} /> 
                        : <span></span>
                    }
                </section>
            </div>
        </>
    )
}