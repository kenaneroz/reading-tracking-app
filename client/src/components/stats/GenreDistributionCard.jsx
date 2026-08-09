import { useState } from "react"
import HorizontalDivider from "./HorizontalDivider"
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer } from "recharts"
import EmptyState from "./EmptyState"

export default function GenreDistributionCard({ totalFilteredBooks, genreCounts }) {
    const [isOthersVisible, setIsOthersVisible] = useState(false)

    const totalGenres = Object.keys(genreCounts).length

    let sortedGenreDistribution = Object.entries(genreCounts)
        .map(([genre, count]) => ({
            genre,
            count,
            percent: Math.round((count / totalFilteredBooks) * 100)
        }))
        .sort((a, b) => b.count - a.count)

    let topGenres = []
    if (totalGenres > 5) {
        const otherCount = sortedGenreDistribution
            .slice(4)
            .reduce((sum, genre) => sum + genre.count, 0)

        topGenres = [
            ...sortedGenreDistribution.slice(0, 4),
            {
                genre: "Others",
                count: otherCount,
                percent: Math.round((otherCount / totalFilteredBooks) * 100)
            },
        ]
    } else {
        topGenres = sortedGenreDistribution
    }


    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="h4 text-espresso">Genre distribution</h2>
                <span className="text-body-sm text-taupe">
                    {totalGenres} {totalGenres === 1 ? "genre" : "genres"}
                </span>
            </div>

            <div className="w-full mt-5 h-35">
                {topGenres.length > 0
                    ? <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={topGenres}
                            layout="vertical"
                            margin={{ top: 0, right: 100, left: 0, bottom: 0 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="genre"
                                width={130}
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                tick={{ fill: "#8D7F73", fontSize: 14, fontFamily: "Manrope" }}
                            />
                            <Bar dataKey="count" radius={[0, 0, 0, 0]} barSize={12}>
                                {topGenres.map((entry, index) => (
                                    <Cell key={index} fill="#4B382A" />
                                ))}
                                <LabelList
                                    dataKey="count"
                                    position="right"
                                    content={({ x, y, width, height, index }) => {
                                        const item = topGenres[index]
                                        if (!item) return null
                                        return (
                                            <text x={x + width + 8} y={y + height / 2} dy={4}>
                                                <tspan fill="#4B382A" fontWeight="600" fontSize="16" fontFamily="Manrope">
                                                    {item.count}
                                                </tspan>
                                                <tspan fill="#8D7F73" fontSize="12" fontFamily="Manrope" dx="4">
                                                    ({item.percent}%)
                                                </tspan>
                                            </text>
                                        );
                                    }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    : <EmptyState />
                }
            </div>

            { totalGenres > 5 &&
                <button
                    className="cursor-pointer w-full h-9 border border-tan rounded-[12px] text-body-sm text-coffee mt-5 hover:bg-tan transition-all duration-300"
                    onClick={() => setIsOthersVisible(prev => !prev)}
                >
                    {isOthersVisible ? "Hide others" : "Show others"}
                </button>

            }

            {isOthersVisible && (
                <>
                    <div className="mt-4">
                        <HorizontalDivider />
                    </div>

                    <div className="mt-3 flex flex-col gap-1">
                        {
                            sortedGenreDistribution
                                .filter((_, index) => index >= 4)
                                .map((other) => (
                                    <div key={other.genre} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-espresso h-[6px] w-[6px] rounded-full"></div>
                                            <p className="text-body-sm text-coffee">{other.genre}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <p className="w-8 text-body-sm font-semibold text-espresso text-right">{other.count}</p>
                                            <p className="w-12 text-taupe text-body-xs text-right">({other.percent}%)</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}