import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { EdgeStoreProvider } from '@/libs/edgestore'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ClientThemeWrapper from '@/contexts/clientThemeWrapper'

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
            <body className={inter.className}>
                <ThemeProvider>
                    <ClientThemeWrapper>
                        <div className="flex">
                            <Sidebar />
                            <EdgeStoreProvider>{children}</EdgeStoreProvider>
                        </div>
                    </ClientThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
