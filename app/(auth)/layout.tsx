import Image from 'next/image'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="font-inter flex min-h-screen w-full justify-between">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src={'/icons/auth-image.svg'}
                        alt="Auth Image"
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </main>
    )
}
