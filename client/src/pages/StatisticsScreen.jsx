import { useState, useEffect } from "react"

import StatsHeader from "../components/stats/StatsHeader"
import DateFilterPill from "../components/stats/DateFilterPill"
import CardShell from "../components/stats/CardShell"
import SummaryCard from "../components/stats/SummaryCard"
import StatusDistributionCard from "../components/stats/StatusDistributionCard"
import GenreDistributionCard from "../components/stats/GenreDistributionCard"
import CompletedByMonthCard from "../components/stats/CompletedByMonthCard"
import LongestBookCard from "../components/stats/LongestBookCard"
import LongestStreak from "../components/stats/LongestStreak"
import RatingCard from "../components/stats/RatingCard"
import FormatDistributionCard from "../components/stats/FormatDistributionCard"
import BottomNavigation from "../components/BottomNavigation"

import { Car, LibrariesIcon, NoteIcon, BookOpen02Icon, SmartPhone01Icon, FileHeadphoneIcon, Pdf01Icon } from "@hugeicons/core-free-icons"

export default function StatisticsScreen({ books, setBooks, addBook }) {
    const [activeDateFilter, setActiveDateFilter] = useState("All time")
    const [customDateRange, setCustomDateRange] = useState({ startDate: "", endDate: "" })

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()
    const filteredBooks = books
        .filter(book => {
            if (activeDateFilter === "All time") return true

            const bookDate = new Date(book.createdAt)

            if (activeDateFilter === "This year") {
                return bookDate.getFullYear() === currentYear
            }
            
            if (activeDateFilter === "This month") {
                return (
                    bookDate.getFullYear() === currentYear &&
                    bookDate.getMonth() === currentMonth
                )
            }

            if (activeDateFilter === "Custom") {
                return (
                    (book.createdAt >= Date.parse(customDateRange.startDate) || !customDateRange.startDate) &&
                    (book.createdAt <= Date.parse(customDateRange.endDate) || !customDateRange.endDate)
                )
            }

            return true
        })

    const totalBooks = filteredBooks.length
    const totalPages = filteredBooks.reduce((total, book) => total + book.totalPages, 0)

    const statusDistributionData = [
        { name: "Finished", count: 0, percent: 0, color: "#4B382A", colorClass: "bg-espresso" },
        { name: "Reading", count: 0, percent: 0, color: "#A8422E", colorClass: "bg-red" },
        { name: "Wishlist", count: 0, percent: 0, color: "#8D7F73", colorClass: "bg-taupe" },
    ]
    const genreCounts = {}

    const countsByMonth = [
        { month: "Jan", count: 0 },
        { month: "Feb", count: 0 },
        { month: "Mar", count: 0 },
        { month: "Apr", count: 0 },
        { month: "May", count: 0 },
        { month: "Jun", count: 0 },
        { month: "Jul", count: 0 },
        { month: "Aug", count: 0 },
        { month: "Sep", count: 0 },
        { month: "Oct", count: 0 },
        { month: "Nov", count: 0 },
        { month: "Dec", count: 0 }
    ]

    let longestBook = filteredBooks[0] || null

    function getStreak(readingActivity) {
        const uniqueDays = [...new Set(
            readingActivity.map(activity => {
                const date = new Date(activity.date)
                date.setHours(0, 0, 0, 0)
                return date.getTime()
            })
            )].sort((a, b) => a - b)

        let longestStreak = 0
        let currentStreak = 1

        for (let i = 1; i < uniqueDays.length; i++) {
            const diff = uniqueDays[i] - uniqueDays[i - 1]

            if (diff === 24 * 60 * 60 * 1000) {
                currentStreak++
            } else {
                longestStreak = Math.max(longestStreak, currentStreak)
                currentStreak = 1
            }
        }

        return Math.max(longestStreak, currentStreak)
    }

    let longestStreak = filteredBooks.length > 0 ? getStreak(filteredBooks[0].readingActivity) : null
    let longestStreakBookId = filteredBooks[0]?._id || null

    let ratingDistribution = [
        { rating: 1, count: 0, percent: 0, books: [] },
        { rating: 2, count: 0, percent: 0, books: [] },
        { rating: 3, count: 0, percent: 0, books: [] },
        { rating: 4, count: 0, percent: 0, books: [] },
        { rating: 5, count: 0, percent: 0, books: [] }
    ]
    let totalRatedBooks = 0
    let rating = 0

    let formatDistribution = [
        {icon: BookOpen02Icon, name: "Physical", count: 0, percent: 0, color: "#4B382A", colorClass: "bg-espresso" },
        {icon: SmartPhone01Icon, name: "E-book", count: 0, percent: 0, color: "#A8422E", colorClass: "bg-red" },
        {icon: FileHeadphoneIcon, name: "Audiobook", count: 0, percent: 0, color: "#8D7F73", colorClass: "bg-taupe" },
        {icon: Pdf01Icon, name: "PDF", count: 0, percent: 0, color: "#C08A2E", colorClass: "bg-yellow" }
    ]

    filteredBooks.forEach(book => {
        // Status distribution
        if (book.status === "Finished") statusDistributionData[0].count++
        else if (book.status === "Reading") statusDistributionData[1].count++
        else if (book.status === "Wishlist") statusDistributionData[2].count++

        // Genre distribution
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1

        // Completed by month
        const month = new Date(book.createdAt).getMonth()
        countsByMonth[month].count += 1

        if (book.totalPages > longestBook.totalPages) longestBook = book

        const newStreak = getStreak(book.readingActivity)
        if (newStreak > longestStreak) {
            longestStreak = newStreak
            longestStreakBookId = book._id
        }

        if (book.rating) {
            ratingDistribution[book.rating - 1].count++
            totalRatedBooks++
            rating += book.rating
            ratingDistribution[book.rating - 1].books.push({
                id: book._id,
                cover: book.cover,
                title: book.title
            })
        }

        if (book.format === "Physical") formatDistribution[0].count++
        else if (book.format === "E-book") formatDistribution[1].count++
        else if (book.format === "Audiobook") formatDistribution[2].count++
        else if (book.format === "PDF") formatDistribution[3].count++
    })

    statusDistributionData.forEach(status => {
        status.percent = 
            totalBooks 
                ? Math.round((status.count / totalBooks) * 100)
                : 0
    })

    if (totalRatedBooks > 0) {
        ratingDistribution.forEach(r => {
            r.percent = Math.round((r.count / totalRatedBooks) * 100)
            console.log(r.count)
        })
        rating = (rating / totalRatedBooks).toFixed(1)
    }    

    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col">
            <div className="flex-1 bg-cream overflow-y-auto py-6">
                <div className="px-5">
                    <StatsHeader />
                </div>

                <div className="mt-6 mb-5 px-5">
                    <DateFilterPill 
                        activeDateFilter={activeDateFilter}
                        setActiveDateFilter={setActiveDateFilter}
                        customDateRange={customDateRange}
                        setCustomDateRange={setCustomDateRange}
                    />
                </div>

                <div className="w-full flex gap-3 px-5">
                    <CardShell customClasses="flex-1 hover:scale-[1.01] transition-all duration-300">
                        <SummaryCard 
                            label="Total books"
                            icon={LibrariesIcon}
                            value={totalBooks}
                            caption="in your library"
                        />
                    </CardShell>
                    
                    <CardShell customClasses="flex-1 hover:scale-[1.01] transition-all duration-300">
                        <SummaryCard 
                            label="Total pages"
                            icon={NoteIcon}
                            value={totalPages}
                            caption="pages turned"
                        />                
                    </CardShell>
                </div>

                <div className="px-5 mt-4">
                    <CardShell>
                        <StatusDistributionCard 
                            totalBooks={totalBooks}
                            data={statusDistributionData} 
                        />
                    </CardShell>    
                </div>

                <div className="px-5 mt-4">
                    <CardShell>
                        <GenreDistributionCard 
                            totalBooks={totalBooks}
                            genreCounts={genreCounts} 
                        />
                    </CardShell>
                </div>

                <div className="px-5 mt-4">
                    <CardShell>
                        <CompletedByMonthCard 
                            totalBooks={totalBooks}
                            countsByMonth={countsByMonth} 
                        />
                    </CardShell>
                </div>

                <div className="px-5 mt-4">
                    <CardShell customClasses="cursor-pointer hover:scale-[1.01] transition-all duration-300">
                        <LongestBookCard book={longestBook} />
                    </CardShell>
                </div>

                <div className="px-5 mt-4">
                    <CardShell customClasses="cursor-pointer hover:scale-[1.01] transition-all duration-300">
                        <LongestStreak 
                            totalBooks={totalBooks}
                            id={longestStreakBookId}
                            streak={longestStreak} 
                        />
                    </CardShell>
                </div>

                <div className="px-5 mt-4">
                    <CardShell>
                        <RatingCard 
                            totalBooks={totalBooks}
                            ratingDistribution={ratingDistribution}
                            totalRatedBooks={totalRatedBooks}
                            rating={rating}
                        />
                    </CardShell>                
                </div>

                <div className="px-5 mt-4">
                    <CardShell>
                        <FormatDistributionCard 
                            totalBooks={totalBooks}
                            data={formatDistribution} 
                        />
                    </CardShell>                
                </div>
            </div>

            <BottomNavigation
                books={books}
                setBooks={setBooks}
                addBook={addBook}
            />
        </div>
    )
}