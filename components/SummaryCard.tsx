'use client'
import { StockData } from '@/app/(root)/dashboard/page'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { StockMiniChart } from './StockMiniChart'
import { Card } from './ui/card'
const SummaryCard = ({ data }: { data: StockData }) => {
    const [trend, setTrend] = useState<'up' | 'down'>('up')
    useEffect(() => {
        if (data.totalReturn < 0) {
            setTrend('down')
        }
    }, [data.totalReturn])
    return (
        <Card className="m-2 cursor-pointer gap-2 border-none p-2 shadow-none hover:shadow-md dark:bg-gray-900 dark:hover:bg-slate-800">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Image
                        className="rounded-full bg-white p-1"
                        src={data.logo}
                        alt="Apple Logo"
                        width={30}
                        height={30}
                    />
                    <div>{data.fullName}</div>
                </div>
                <div>
                    <StockMiniChart trend={trend} />
                </div>
            </div>
            <div className="flex justify-between">
                <div className="">Total shares</div>
                <div className="font-semibold">${data.totalShares}</div>
            </div>
            <div className="flex justify-between">
                <div className="">Total return</div>
                <div
                    className={`font-semibold ${data.totalReturn > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                    {data.totalReturn * 100}%
                </div>
            </div>
        </Card>
    )
}

export default SummaryCard
