import Image from 'next/image'

import { StockData } from '@/app/(root)/dashboard/page'
import { StockChart } from './StockChart'
import { Button } from './ui/button'

const StockPerformance = ({ stock }: { stock: StockData }) => {
    return (
        <div className="flex h-full w-full basis-2/3 flex-col items-center justify-between gap-4 rounded-xl bg-background p-4 dark:!bg-gray-900">
            <div className="flex w-full justify-between border-b-2 dark:border-gray-400">
                <div className="flex items-center gap-4">
                    <Image
                        className="rounded-full bg-white p-1"
                        src={stock?.logo}
                        alt="Apple Logo"
                        width={32}
                        height={32}
                    />
                    <div className="flex flex-col justify-between">
                        <div className="text-lg font-bold">
                            {stock.fullName}
                        </div>
                        <div className="dark:text-gray-200">{stock.name}</div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-start gap-2">
                        <div
                            className={`rounded-xl ${stock.totalReturn >= 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 text-xs text-white`}
                        >
                            {stock.totalReturn * 100}%
                        </div>
                        <div className="align-top text-xl font-semibold">
                            ${stock.totalShares}
                        </div>
                    </div>

                    <div className="text-xs">Last updated at 14.30</div>
                </div>
            </div>
            <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-wrap justify-between">
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        1Day
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        1Week
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        1Month
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        3Month
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        6Month
                    </Button>
                    <Button
                        variant={'default'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        1Year
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        5Year
                    </Button>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="min-w-[80px]"
                    >
                        All
                    </Button>
                </div>
                <div className="h-[250px] 2xl:h-[400px]">
                    <StockChart stock={stock} />
                </div>
            </div>
        </div>
    )
}

export default StockPerformance
