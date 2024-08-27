'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

import { ChevronDownIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import TotalInvestment from './TotalInvestment'
import { Button } from './ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible'

const Sidebar = () => {
    const pathName = usePathname()
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section className="sidebar">
            <nav className="flex h-full flex-col justify-between">
                <Link
                    className="flex w-full items-center justify-center gap-4 self-center pb-4"
                    href="/"
                >
                    <Image
                        src={
                            theme === 'dark'
                                ? '/icons/logo.svg'
                                : '/icons/logo-dark.svg'
                        }
                        width={34}
                        height={34}
                        alt="Go Stocks"
                        className="size-[24px] max-xl:size-14"
                    />
                    <p className="sidebar-logo">GoStock</p>
                </Link>

                <div className="max-xl:hidden">
                    <TotalInvestment />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div className="">
                        {sidebarLinks.slice(0, 4).map((link) => {
                            const isActive =
                                pathName === link.route ||
                                pathName.startsWith(`${link.route}/`)
                            return (
                                <Link
                                    key={link.route}
                                    href={link.route}
                                    className={cn('sidebar-link', {
                                        '!bg-[#F4F6F8]': isActive,
                                    })}
                                >
                                    <div className="relative size-6">
                                        <Image
                                            className={`dark:invert ${isActive ? '!invert-0' : ''}`}
                                            src={link.imgURL}
                                            fill
                                            alt={link.label}
                                        />
                                    </div>
                                    <p
                                        className={cn('sidebar-label', {
                                            '!text-black-1': isActive,
                                        })}
                                    >
                                        {link.label}
                                    </p>
                                </Link>
                            )
                        })}

                        <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className="w-full"
                        >
                            <div className="flex items-center justify-center gap-3 rounded-lg py-1 md:p-3 xl:justify-start 2xl:p-4">
                                <div
                                    className="flex items-center justify-center gap-3"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <Image
                                        className={`dark:invert`}
                                        src={sidebarLinks[4].imgURL}
                                        width={24}
                                        height={24}
                                        alt={sidebarLinks[4].label}
                                    />
                                    <p
                                        className={cn('sidebar-label', {
                                            '!text-white':
                                                pathName ===
                                                sidebarLinks[4].route,
                                        })}
                                    >
                                        {sidebarLinks[4].label}
                                    </p>
                                </div>

                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 max-xl:hidden"
                                    >
                                        {isOpen ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronDownIcon className="h-4 w-4 rotate-180 transform" />
                                        )}

                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent>
                                <div className="flex flex-col justify-between gap-1 pl-12 max-xl:pl-0">
                                    {sidebarLinks[4]?.children?.map((child) => {
                                        const isActive =
                                            pathName === child.route ||
                                            pathName.startsWith(
                                                `${child.route}/`
                                            )
                                        return (
                                            <Link
                                                key={child.route}
                                                href={child.route}
                                                className="flex items-center justify-center rounded-lg max-xl:ml-0 xl:justify-start"
                                            >
                                                <p
                                                    className={cn(
                                                        'text-sm font-semibold'
                                                    )}
                                                >
                                                    {child.label}
                                                </p>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="">
                        {sidebarLinks.slice(5).map((link) => {
                            const isActive =
                                pathName === link.route ||
                                pathName.startsWith(`${link.route}/`)
                            return (
                                <Link
                                    key={link.route}
                                    href={link.route}
                                    className={cn(
                                        'sidebar-link flex w-full items-center justify-center rounded-lg max-xl:ml-0 xl:justify-start'
                                    )}
                                >
                                    <div className="flex gap-4">
                                        <div className="relative size-6">
                                            <Image
                                                className={`dark:invert ${isActive ? '!invert-0' : ''}`}
                                                src={link.imgURL}
                                                fill
                                                alt={link.label}
                                            />
                                        </div>
                                        <p
                                            className={cn('sidebar-label', {
                                                '!text-white': isActive,
                                            })}
                                        >
                                            {link.label}
                                        </p>
                                    </div>

                                    {link.notificationCount && (
                                        <span className="notification-badge max-xl:hidden">
                                            {link.notificationCount}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Sidebar
