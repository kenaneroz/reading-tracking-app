import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer } from "recharts";

export default function CompletedByMonthCard({ totalBooks, countsByMonth }) {
    return (
        <div className="">
            <h2 className="h4 text-espresso">Completed by month</h2>

            { totalBooks > 0
                ? <ResponsiveContainer width="100%" height={140} className="mt-5">
                    <BarChart data={countsByMonth} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#8D7F73", fontSize: 12, fontFamily: "Manrope" }}
                        />
                        <YAxis hide />
                        <Bar dataKey="count" barSize={20}>
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
                : <div className="mt-5 text-center">
                    <p className="text-body-sm text-coffee font-medium">No books yet</p>
                    <p className="mt-1 text-body-sm text-taupe">
                        Add books to track your reading progress over time.
                    </p>
                </div>
            }
        </div>
    )
}