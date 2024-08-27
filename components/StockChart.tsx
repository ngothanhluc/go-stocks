'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { StockData } from '@/app/(root)/dashboard/page'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
    { month: 'July', desktop: 92 },
    { month: 'August', desktop: 299 },
    { month: 'September', desktop: 189 },
    { month: 'October', desktop: 126 },
    { month: 'November', desktop: 167 },
    { month: 'December', desktop: 233 },
]

export function StockChart({ stock }: { stock: StockData }) {
    const gradientKey = stock.totalReturn >= 0 ? 'up' : 'down'
    const color = stock.totalReturn >= 0 ? '#57de57' : '#ff4d4f'
    const chartConfig = {
        desktop: {
            label: 'Desktop',
            color: color,
        },
    } satisfies ChartConfig
    return (
        <ChartContainer
            config={chartConfig}
            className="h-full min-h-[200px] w-full"
        >
            <AreaChart
                accessibilityLayer
                data={stock.chartData || chartData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={5}
                />
                <ChartTooltip
                    cursor={{
                        stroke: '#000',
                        strokeDasharray: 5,
                        strokeWidth: 2,
                    }}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                    <linearGradient
                        id={gradientKey}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop
                            offset="95%"
                            stopColor={color}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="stockPrice"
                    type="linear"
                    fill={`url(#${gradientKey})`}
                    fillOpacity={0.4}
                    stroke={color}
                />
            </AreaChart>
        </ChartContainer>
    )
}
