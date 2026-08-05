import StatsHeader from "../components/stats/StatsHeader"
import DateFilterPill from "../components/stats/DateFilterPill"
import CardShell from "../components/stats/CardShell"
import SummaryCard from "../components/stats/SummaryCard"
import StatusDistributionCard from "../components/stats/StatusDistributionCard"
import GenreDistributionCard from "../components/stats/GenreDistributionCard"
import CompletedByMonthCard from "../components/stats/CompletedByMonthCard"

import { useState, useEffect } from "react"

import { Car, LibrariesIcon, NoteIcon } from "@hugeicons/core-free-icons"

export default function StatisticsScreen({ books }) {
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
    })

    statusDistributionData.forEach(status => {
        status.percent = 
            totalBooks 
                ? Math.round((status.count / totalBooks) * 100)
                : 0
    })



    return (
        <div className="md:w-110 h-dvh md:h-239 bg-cream flex flex-col overflow-y-scroll">
            <StatsHeader />

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
                    <StatusDistributionCard data={statusDistributionData} />
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
                    <CompletedByMonthCard countsByMonth={countsByMonth} />
                </CardShell>
            </div>

            <div className="px-5 mt-4">


            </div>
        </div>
    )
}