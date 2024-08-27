import { StockData } from '@/app/(root)/dashboard/page'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

const WatchList = ({ stocks }: { stocks: StockData[] }) => {
    return (
        <div className="basis-1/3 rounded-xl bg-white p-6 dark:bg-gray-900">
            <div className="mb-2 flex justify-between">
                <div className="flex font-semibold">My Watch List</div>
                <div className="cursor-pointer">
                    <PlusIcon />
                </div>
            </div>
            <div className="flex h-full flex-col justify-around max-sm:gap-2">
                {stocks.slice(0, 5).map((stock, index) => (
                    <div className="flex justify-between gap-20" key={index}>
                        <div className="flex items-center gap-2">
                            <Image
                                className="rounded-full bg-white p-1"
                                src={stock.logo}
                                alt="Apple Logo"
                                width={32}
                                height={32}
                            />
                            <div className="flex flex-col justify-between">
                                <div className="font-medium">{stock.name}</div>
                                <div className="text-sm dark:text-gray-400">
                                    {stock.fullName}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="font-semibold">
                                ${stock.totalShares}
                            </div>
                            <div
                                className={`${stock.totalShares > 0 ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {stock.totalReturn * 100}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchList
