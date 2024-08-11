import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import { EdgeStoreProvider } from '@/libs/edgestore'
import ClientThemeWrapper from '@/contexts/ClientThemeWrapper'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LocalizationProvider } from '@/libs/mui'
import { AdapterDayjs } from '@/libs/mui'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className}>
                <ThemeProvider>
                    <ClientThemeWrapper>
                        <div className="flex h-dvh">
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="en-gb"
                            >
                                <Sidebar />
                                <EdgeStoreProvider>
                                    {children}
                                </EdgeStoreProvider>
                            </LocalizationProvider>
                        </div>
                    </ClientThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
