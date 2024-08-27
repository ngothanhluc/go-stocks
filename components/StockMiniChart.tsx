'use client'

import { Area, AreaChart, CartesianGrid } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
const data = [
    { x: 1, y: 55 },
    { x: 2, y: 90 },
    { x: 3, y: 80 },
    { x: 4, y: 85 },
    { x: 5, y: 75 },
    { x: 6, y: 70 },
    { x: 7, y: 65 },
    { x: 8, y: 60 },
    { x: 9, y: 55 },
    { x: 10, y: 50 },
    { x: 11, y: 45 },
    { x: 12, y: 55 },
    { x: 13, y: 60 },
    { x: 14, y: 93 },
    { x: 15, y: 50 },
    { x: 16, y: 98 },
    { x: 17, y: 75 },
    { x: 18, y: 90 },
    { x: 19, y: 73 },
    { x: 20, y: 62 },
    { x: 21, y: 100 },
    { x: 22, y: 92 },
    { x: 23, y: 49 },
    { x: 24, y: 40 },
    { x: 25, y: 50 },
    { x: 26, y: 60 },
    { x: 27, y: 70 },
    { x: 28, y: 80 },
    { x: 29, y: 90 },
    { x: 30, y: 100 },
]

interface StockMiniChartProps {
    trend: 'up' | 'down'
}
export function StockMiniChart({ trend }: StockMiniChartProps) {
    const color = trend === 'up' ? '#57de57' : '#ff4d4f'
    const gradientId = trend === 'up' ? 'gradientUp' : 'gradientDown'
    const chartConfig = {
        y: {
            label: 'y',
            color: color,
        },
    } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className="h-12 w-20">
            <AreaChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop
                            offset="95%"
                            stopColor={color}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="y"
                    type="linear"
                    fill={`url(#${gradientId})`}
                    fillOpacity={0.2}
                    stroke={color}
                />
            </AreaChart>
        </ChartContainer>
    )
}
