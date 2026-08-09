import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer } from "recharts";
import EmptyState from "./EmptyState";

export default function CompletedByMonthCard({ totalFilteredBooks, countsByMonth }) {
    return (
        <div className="">
            <h2 className="h4 text-espresso">Completed by month</h2>

            <div className="h-40">
                { totalFilteredBooks > 0
                    ? <ResponsiveContainer width="100%" height="100%" className="mt-5">
                        <BarChart data={countsByMonth} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                angle={-60}
                                textAnchor="end"
                                tick={{
                                    fill: "#8D7F73",
                                    fontSize: 12,
                                    fontFamily: "Manrope"
                                }}
                            />
                            <YAxis hide />
                            <Bar dataKey="count" barSize={16} radius={8}>
                                {countsByMonth.map((_, index) => (
                                    <Cell key={index} fill="#4B382A" />
                                ))}

                                <LabelList
                                    dataKey="count"
                                    position="top"
                                    offset={8}
                                    style={{ fill: "#4B382A", fontSize: 16, fontWeight: 600 }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    : <EmptyState />
                }
            </div>
        </div>
    )
}