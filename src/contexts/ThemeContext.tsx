'use client'

import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
    theme: string
    changeTheme: (theme: string) => void
}

const defaultContextValue: ThemeContextType = {
    theme: 'light',
    changeTheme: () => {},
}

export const ThemeContext = createContext(defaultContextValue)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>('light')
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light'
        setTheme(storedTheme)
        setIsMounted(true)
    }, [])

    const changeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    if (!isMounted) {
        return (
            <div className="flex h-dvh items-center justify-center">
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
