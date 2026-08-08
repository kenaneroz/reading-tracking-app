import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

import HorizontalDivider from "./HorizontalDivider"

export default function StatusDistributionCard({ totalBooks, data }) {
    return (
        <>
            <h2 className="h4 text-espresso">Status distribution</h2>

            <div className="h-40 w-full flex justify-center items-center my-5">
                { totalBooks > 0
                    ? <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie
                                data={data}                             
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}   // this is what creates the "donut" hole
                                outerRadius={80}
                                paddingAngle={2}   // small gap between segments
                                startAngle={90}
                                endAngle={-270}    // clockwise from 12 o'clock
                            >
                                { 
                                    data.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    : <div className="text-center">
                        <p className="text-body-sm text-coffee font-medium">No books yet</p>
                        <p className="mt-1 text-body-sm text-taupe">
                            Add books to your library to see their status distribution.
                        </p>
                    </div>
                }
            </div>

            <div className="mb-5">
                <HorizontalDivider />
            </div>

            <div className="flex gap-6">
                {
                    data.map(status => {
                        return <div key={status.name} className="flex-1 flex flex-col items-center">
                            <div className="w-fit flex gap-2 items-center">
                                <div className={`h-2 w-2 rounded-full ${status.colorClass}`}></div>
                                <p className="text-body-sm text-taupe">{status.name}</p>    
                            </div>

                            <div className="w-fit flex gap-1 items-center">
                                <p className="text-body font-semibold text-espresso">{status.count}</p>

                                <p className="text-body-xs text-taupe">
                                    ({status.percent}%)
                                </p>
                            </div>
                        </div>
                    })
                }             
            </div>
        </>
    )
}