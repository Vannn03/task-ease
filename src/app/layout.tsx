import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
// import './globals.css'
import '../../build.css'
import { EdgeStoreProvider } from '@/libs/edgestore'
import ClientThemeWrapper from '@/contexts/ClientThemeWrapper'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LocalizationProvider, AdapterDayjs } from '@/libs/mui'
import NavSideBar from '@/components/utilities/NavSideBar'

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
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="en-gb"
                        >
                            <NavSideBar />
                            <div className="min-h-[calc(100dvh-56px)] w-full bg-base-200 sm:min-h-[calc(100dvh-72px)]">
                                <EdgeStoreProvider>
                                    {children}
                                </EdgeStoreProvider>
                            </div>
                        </LocalizationProvider>
                    </ClientThemeWrapper>
                </ThemeProvider>
            </body>
        </html>
    )
}
