'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import NotificationIcon from './NotificationIcon'
import { Input } from './ui/input'
import { UserDropdownOptions } from './UserDropdownOptions'

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex w-full justify-between sm:hidden">
                <Link
                    className="flex items-center justify-center px-4"
                    href="/"
                >
                    <Image
                        src={
                            theme === 'dark'
                                ? '/icons/logo-dark.svg'
                                : '/icons/logo.svg'
                        }
                        width={32}
                        height={32}
                        alt="Go Stocks"
                    />
                </Link>
                <MobileNav />
            </div>
            <Input placeholder="Search" className="basis-1/2 max-sm:hidden" />
            <div className="flex items-center">
                <div className="flex items-center gap-8 pr-10 max-sm:hidden">
                    <NotificationIcon
                        notificationCount={10}
                        className="cursor-pointer"
                    />
                    <div className="cursor-pointer">
                        <Image
                            className="dark:invert"
                            src={'/icons/mail.svg'}
                            alt="Mail"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            theme === 'dark'
                                ? setTheme('light')
                                : setTheme('dark')
                        }
                    >
                        {theme === 'light' ? (
                            <Image
                                src="/icons/moon.svg"
                                alt="Theme"
                                width={32}
                                height={32}
                            />
                        ) : (
                            <Image
                                src="/icons/sun.svg"
                                alt="Theme"
                                width={32}
                                height={32}
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 border-l-2 pl-10 max-sm:hidden">
                    <div className="flex cursor-pointer items-center justify-center rounded-full bg-slate-200">
                        <Image
                            src={'/icons/avatar.svg'}
                            alt="User Avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div className="font-semibold">Ngo Thanh Luc</div>
                    <UserDropdownOptions />
                </div>
            </div>
        </div>
    )
}

export default Navbar
