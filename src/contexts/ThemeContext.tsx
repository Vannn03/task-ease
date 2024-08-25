'use client'

import { createContext, useEffect, useState, useMemo } from 'react'
import { createTheme, Theme, PaletteMode } from '@mui/material'
import PageLoader from '@/components/utilities/Loaders/PageLoader'

interface ThemeContextType {
    theme: string
    muiTheme: Theme
    changeTheme: (theme: 'light' | 'dark') => void
}

const defaultContextValue: ThemeContextType = {
    theme: 'light',
    muiTheme: createTheme(),
    changeTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<string>('light')
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light'
        setTheme(storedTheme)
        setIsMounted(true)
    }, [])

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme as PaletteMode,
                },
            }),
        [theme]
    )

    const changeTheme = (newTheme: 'light' | 'dark') => {
        if (newTheme !== theme) {
            setTheme(newTheme)
            localStorage.setItem('theme', newTheme)
        }
    }

    if (!isMounted) {
        return <PageLoader />
    }

    return (
        <ThemeContext.Provider value={{ theme, muiTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
