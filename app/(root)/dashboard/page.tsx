'use client'
import StockPerformance from '@/components/StockPerformance'
import SummaryCard from '@/components/SummaryCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import WatchList from '@/components/WatchList'
import { useState } from 'react'
export interface StockData {
    name: string
    fullName: string
    logo: string
    chartData: {
        month: string
        stockPrice: number
    }[]
    totalShares: number
    totalReturn: number
}
const mockupData: StockData[] = [
    {
        name: 'AAPL',
        fullName: 'Apple',
        logo: 'icons/apple.svg',
        chartData: [
            { month: 'January', stockPrice: 186 },
            { month: 'February', stockPrice: 305 },
            { month: 'March', stockPrice: 237 },
            { month: 'April', stockPrice: 73 },
            { month: 'May', stockPrice: 209 },
            { month: 'June', stockPrice: 214 },
            { month: 'July', stockPrice: 92 },
            { month: 'August', stockPrice: 299 },
            { month: 'September', stockPrice: 189 },
            { month: 'October', stockPrice: 126 },
            { month: 'November', stockPrice: 167 },
            { month: 'December', stockPrice: 233 },
        ],
        totalShares: 310.04,
        totalReturn: -0.0104,
    },
    {
        name: 'META',
        fullName: 'Meta',
        logo: 'icons/meta.svg',
        chartData: [
            { month: 'January', stockPrice: 150 },
            { month: 'February', stockPrice: 180 },
            { month: 'March', stockPrice: 210 },
            { month: 'April', stockPrice: 190 },
            { month: 'May', stockPrice: 220 },
            { month: 'June', stockPrice: 240 },
            { month: 'July', stockPrice: 230 },
            { month: 'August', stockPrice: 250 },
            { month: 'September', stockPrice: 260 },
            { month: 'October', stockPrice: 280 },
            { month: 'November', stockPrice: 300 },
            { month: 'December', stockPrice: 320 },
        ],
        totalShares: 500.5,
        totalReturn: 0.005,
    },
    {
        name: 'MSFT',
        fullName: 'Microsoft',
        logo: 'icons/microsoft.svg',
        chartData: [
            { month: 'January', stockPrice: 250 },
            { month: 'February', stockPrice: 260 },
            { month: 'March', stockPrice: 270 },
            { month: 'April', stockPrice: 280 },
            { month: 'May', stockPrice: 290 },
            { month: 'June', stockPrice: 300 },
            { month: 'July', stockPrice: 310 },
            { month: 'August', stockPrice: 320 },
            { month: 'September', stockPrice: 330 },
            { month: 'October', stockPrice: 340 },
            { month: 'November', stockPrice: 350 },
            { month: 'December', stockPrice: 360 },
        ],
        totalShares: 1000,
        totalReturn: 0.01,
    },
    {
        name: 'GOOG',
        fullName: 'Google',
        logo: 'icons/google.svg',
        chartData: [
            { month: 'January', stockPrice: 1500 },
            { month: 'February', stockPrice: 1550 },
            { month: 'March', stockPrice: 1600 },
            { month: 'April', stockPrice: 1650 },
            { month: 'May', stockPrice: 1700 },
            { month: 'June', stockPrice: 1750 },
            { month: 'July', stockPrice: 1800 },
            { month: 'August', stockPrice: 1850 },
            { month: 'September', stockPrice: 1900 },
            { month: 'October', stockPrice: 1950 },
            { month: 'November', stockPrice: 2000 },
            { month: 'December', stockPrice: 2050 },
        ],
        totalShares: 750,
        totalReturn: 0.0075,
    },
    {
        name: 'SPOT',
        fullName: 'Spotify',
        logo: 'icons/spotify.svg',
        chartData: [
            { month: 'January', stockPrice: 300 },
            { month: 'February', stockPrice: 310 },
            { month: 'March', stockPrice: 320 },
            { month: 'April', stockPrice: 330 },
            { month: 'May', stockPrice: 340 },
            { month: 'June', stockPrice: 350 },
            { month: 'July', stockPrice: 360 },
            { month: 'August', stockPrice: 370 },
            { month: 'September', stockPrice: 380 },
            { month: 'October', stockPrice: 390 },
            { month: 'November', stockPrice: 400 },
            { month: 'December', stockPrice: 410 },
        ],
        totalShares: 250,
        totalReturn: 0.0025,
    },
    {
        name: 'ABNB',
        fullName: 'Airbnb',
        logo: 'icons/airbnb.svg',
        chartData: [
            { month: 'January', stockPrice: 200 },
            { month: 'February', stockPrice: 210 },
            { month: 'March', stockPrice: 220 },
            { month: 'April', stockPrice: 230 },
            { month: 'May', stockPrice: 240 },
            { month: 'June', stockPrice: 250 },
            { month: 'July', stockPrice: 260 },
            { month: 'August', stockPrice: 270 },
            { month: 'September', stockPrice: 280 },
            { month: 'October', stockPrice: 290 },
            { month: 'November', stockPrice: 300 },
            { month: 'December', stockPrice: 310 },
        ],
        totalShares: 500,
        totalReturn: 0.005,
    },
    {
        name: 'SHOP',
        fullName: 'Shoptify',
        logo: 'icons/shoptify.svg',
        chartData: [
            { month: 'January', stockPrice: 100 },
            { month: 'February', stockPrice: 110 },
            { month: 'March', stockPrice: 120 },
            { month: 'April', stockPrice: 130 },
            { month: 'May', stockPrice: 140 },
            { month: 'June', stockPrice: 150 },
            { month: 'July', stockPrice: 160 },
            { month: 'August', stockPrice: 170 },
            { month: 'September', stockPrice: 180 },
            { month: 'October', stockPrice: 190 },
            { month: 'November', stockPrice: 200 },
            { month: 'December', stockPrice: 210 },
        ],
        totalShares: 100,
        totalReturn: 0.001,
    },
    {
        name: 'SONY',
        fullName: 'Sony',
        logo: 'icons/sony.svg',
        chartData: [
            { month: 'January', stockPrice: 80 },
            { month: 'February', stockPrice: 85 },
            { month: 'March', stockPrice: 90 },
            { month: 'April', stockPrice: 95 },
            { month: 'May', stockPrice: 100 },
            { month: 'June', stockPrice: 105 },
            { month: 'July', stockPrice: 110 },
            { month: 'August', stockPrice: 115 },
            { month: 'September', stockPrice: 120 },
            { month: 'October', stockPrice: 125 },
            { month: 'November', stockPrice: 130 },
            { month: 'December', stockPrice: 135 },
        ],
        totalShares: 1000,
        totalReturn: 0.01,
    },
    {
        name: 'DBX',
        fullName: 'Dropbox Inc',
        logo: 'icons/dropbox.svg',
        chartData: [
            { month: 'January', stockPrice: 50 },
            { month: 'February', stockPrice: 55 },
            { month: 'March', stockPrice: 60 },
            { month: 'April', stockPrice: 65 },
            { month: 'May', stockPrice: 70 },
            { month: 'June', stockPrice: 75 },
            { month: 'July', stockPrice: 80 },
            { month: 'August', stockPrice: 85 },
            { month: 'September', stockPrice: 90 },
            { month: 'October', stockPrice: 95 },
            { month: 'November', stockPrice: 100 },
            { month: 'December', stockPrice: 105 },
        ],
        totalShares: 500,
        totalReturn: 0.005,
    },
    {
        name: 'PYPL',
        fullName: 'PayPal',
        logo: 'icons/paypal.svg',
        chartData: [
            { month: 'January', stockPrice: 150 },
            { month: 'February', stockPrice: 160 },
            { month: 'March', stockPrice: 170 },
            { month: 'April', stockPrice: 180 },
            { month: 'May', stockPrice: 190 },
            { month: 'June', stockPrice: 200 },
            { month: 'July', stockPrice: 210 },
            { month: 'August', stockPrice: 220 },
            { month: 'September', stockPrice: 230 },
            { month: 'October', stockPrice: 240 },
            { month: 'November', stockPrice: 250 },
            { month: 'December', stockPrice: 260 },
        ],
        totalShares: 750,
        totalReturn: 0.0075,
    },
]

const Dashboard = () => {
    const [currentStock, setCurrentStock] = useState(mockupData[0])
    return (
        <section className="h-full w-full bg-[#F5F7F9] p-2 dark:bg-background">
            <div className="flex h-full w-full flex-col gap-4 px-10 py-2">
                <h1 className="text-lg font-semibold">My Portfolio</h1>
                <div className="flex w-full items-center justify-center rounded-2xl p-2">
                    <Carousel
                        opts={{
                            align: 'center',
                        }}
                        className="-ml-2 w-full max-w-sm md:max-w-2xl lg:max-w-4xl"
                    >
                        <CarouselContent>
                            {mockupData.map((stock, index) => (
                                <CarouselItem
                                    onClick={() => setCurrentStock(stock)}
                                    key={index}
                                    className="basis-full pl-1 md:basis-1/2 lg:basis-1/3"
                                >
                                    <SummaryCard data={stock} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="flex h-full w-full gap-10 max-md:flex-col">
                    <StockPerformance stock={currentStock} />
                    <WatchList stocks={mockupData} />
                </div>
            </div>
        </section>
    )
}

export default Dashboard
