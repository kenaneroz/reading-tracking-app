import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import HorizontalDivider from "../shared/HorizontalDivider"

import { HugeiconsIcon } from '@hugeicons/react'
import EmptyState from "./EmptyState"

export default function FormatDistributionCard({ totalFilteredBooks, data }) {
    return (
        <div className="">
            <h2 className="h4 text-espresso">Format distribution</h2>
            
            <div className="h-40 w-full flex justify-center items-center mt-5">
                { totalFilteredBooks > 0
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
                    : <EmptyState />
                }
            </div>

            <HorizontalDivider customClasses="mt-5" />

            <div className="flex flex-col gap-2 mt-4">
                {
                    data.map(format => {
                        return <div className="flex gap-3 items-center">
                            <HugeiconsIcon 
                                icon={format.icon} 
                                size={20} 
                                strokeWidth={1.25} 
                                className="text-taupe"
                            />

                            <div className={`w-2 h-2 rounded-full ${format.colorClass}`}></div>

                            <p className="flex-1 text-body-sm text-coffee">{format.name}</p>

                            <p className="text-body-sm font-semibold text-espresso w-8 text-right">{format.count}</p>

                            <p className="text-body-xs text-taupe w-9 text-right">{format.percent}%</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}