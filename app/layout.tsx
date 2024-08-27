import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Go Stocks',
    description: 'Easily invest in stocks and crypto in one GoStock Platform',
    icons: {
        icon: '/icons/logo.svg',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
