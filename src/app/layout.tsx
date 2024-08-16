import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/utilities/Sidebar'
import { EdgeStoreProvider } from '@/libs/edgestore'
import ClientThemeWrapper from '@/contexts/ClientThemeWrapper'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LocalizationProvider, AdapterDayjs } from '@/libs/mui'
import Navbar from '@/components/utilities/Navbar'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'TaskEase',
    description: 'A simple To-Do List website to simplify your life.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/logo.svg"
                    type="image/svg"
                    sizes="32x32"
                />
            </head>
            <body className={poppins.className}>
                <ThemeProvider>
                    <ClientThemeWrapper>
                        <div className="flex min-h-dvh bg-base-200">
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="en-gb"
                            >
                                <Sidebar />
                                <div className="w-full">
                                    <Navbar />
                                    <EdgeStoreProvider>
                                        {children}
                                    </EdgeStoreProvider>
                                </div>
                            </LocalizationProvider>
                        </div>
                    </ClientThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
