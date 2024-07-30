import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

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
            <body className={`${inter.className} flex`}>
                <Sidebar />
                <div className="w-full p-8">{children}</div>
            </body>
        </html>
    )
}
