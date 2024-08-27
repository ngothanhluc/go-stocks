import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="font-inter flex h-screen w-screen">
            <Sidebar />
            <div className="flex h-full w-full flex-col">
                <Navbar />
                {children}
            </div>
        </main>
    )
}
