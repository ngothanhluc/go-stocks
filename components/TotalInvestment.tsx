import { ArrowUpIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useState } from 'react'

const TotalInvestment = () => {
    const [hide, setHide] = useState(false)
    const toggleHidden = () => {
        setHide(!hide)
    }
    const { theme } = useTheme()
    return (
        <div className="mb-2 flex h-20 w-full items-center justify-between rounded-xl bg-gray-900 dark:bg-gray-100">
            <div className="flex flex-col gap-2 px-4 py-1 text-white dark:text-gray-900">
                <h1 className="text-sm">Total Investment</h1>
                <div className="flex items-center gap-2">
                    <div className="text-xl">
                        {hide ? '$*******' : '$5380,90'}
                    </div>
                    <div
                        onClick={toggleHidden}
                        className="relative size-4 cursor-pointer"
                    >
                        {hide ? (
                            <Image
                                src={'icons/show.svg'}
                                alt="shadow Investment"
                                fill
                                style={{
                                    filter:
                                        theme === 'dark'
                                            ? 'brightness(3) invert(0)'
                                            : 'brightness(1) invert(1)',
                                }}
                            />
                        ) : (
                            <Image
                                src={'icons/hide.svg'}
                                alt="Hide Investment"
                                fill
                                style={{
                                    filter:
                                        theme === 'dark'
                                            ? 'brightness(3) invert(0)'
                                            : 'brightness(1) invert(1)',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="relative h-full">
                <Image
                    src={'icons/fingerprint.svg'}
                    alt="Total Investment BG"
                    fill
                    className="absolute right-0 h-full w-full object-cover opacity-25 invert dark:invert-0"
                />
                <div className="z-10 flex h-full items-center px-4 text-xl font-semibold text-[#57de57] dark:text-[#268026]">
                    <div className="">+18.90%</div>
                    <ArrowUpIcon size={22} strokeWidth={3} />
                </div>
            </div>
        </div>
    )
}

export default TotalInvestment
