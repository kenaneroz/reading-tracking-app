import StatsHeader from "../components/stats/StatsHeader"
import DateFilterPill from "../components/stats/DateFilterPill"
import CardShell from "../components/stats/CardShell"
import SummaryCard from "../components/stats/SummaryCard"
import StatusDistributionCard from "../components/stats/StatusDistributionCard"
import GenreDistributionCard from "../components/stats/GenreDistributionCard"

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
                    <StatusDistributionCard filteredBooks={filteredBooks} />
                </CardShell>    
            </div>

            <div className="px-5 mt-4">
                <CardShell>
                    <GenreDistributionCard filteredBooks={filteredBooks} />
                </CardShell>
            </div>

            <div className="mt-4">

                
            </div>
        </div>
    )
}