'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import TotalInvestment from './TotalInvestment'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
type Props = {}
const NavContent = () => {
    const pathName = usePathname()
    const { theme, setTheme } = useTheme()
    const handleLogout = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            })
            if (response.ok) {
                // Redirect to the sign-in page
                window.location.href = '/sign-in'
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while logging out',
                variant: 'destructive',
            })
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    const [isLoading, setIsLoading] = useState(false)
    return (
        <section className="flex h-full flex-col">
            {sidebarLinks.map((link) => {
                const isActive =
                    (pathName.includes(link.route) && link.route.length > 1) ||
                    pathName === link.route
                return (
                    <SheetClose asChild key={link.route}>
                        <Link
                            key={link.route}
                            href={link.route}
                            className={`flex items-center gap-4 rounded-lg p-3 hover:bg-slate-200 dark:hover:bg-slate-600 ${isActive ? '!bg-slate-200 dark:!bg-slate-600' : ''}`}
                        >
                            <div className="relative size-5">
                                <Image
                                    className={`dark:invert ${isActive && theme === 'light' ? '!invert-0' : ''}`}
                                    src={link.imgURL}
                                    fill
                                    alt={link.label}
                                />
                            </div>
                            <p>{link.label}</p>
                        </Link>
                    </SheetClose>
                )
            })}

            <div className="flex items-center justify-between p-2">
                <div className="flex items-center justify-center gap-2">
                    <div className="flex cursor-pointer items-center justify-center rounded-full bg-slate-200">
                        <Image
                            src={'/icons/avatar.svg'}
                            alt="User Avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div className="font-semibold">Ngo Thanh Luc</div>
                </div>
                <Button size={'sm'} onClick={handleLogout}>
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />{' '}
                            &nbsp; Logging out...
                        </>
                    ) : (
                        'Logout'
                    )}
                </Button>
            </div>

            <div
                className="dark: flex cursor-pointer items-center justify-center gap-2 rounded-full"
                onClick={() =>
                    theme === 'dark' ? setTheme('light') : setTheme('dark')
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
                <div className="text-sm font-bold">Switch theme</div>
            </div>
        </section>
    )
}
const MobileNav = (props: Props) => {
    const { theme } = useTheme()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    alt="hamburger"
                    width={32}
                    height={32}
                    src="/icons/hamburger.svg"
                    className="cursor-pointer dark:invert sm:hidden"
                />
            </SheetTrigger>
            <SheetContent
                side={'left'}
                className="flex flex-col gap-2 border-none"
            >
                <Link
                    className="flex w-full items-center justify-center gap-4"
                    href="/"
                >
                    <Image
                        src={
                            theme === 'dark'
                                ? '/icons/logo.svg'
                                : '/icons/logo-dark.svg'
                        }
                        width={26}
                        height={26}
                        alt="Go Stocks"
                    />
                    <p className="font-semibold">GoStock</p>
                </Link>
                <div className="flex-center">
                    <TotalInvestment />
                </div>

                <NavContent />
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
