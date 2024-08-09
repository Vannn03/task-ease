'use client'

import { createContext, useEffect, useState, useMemo } from 'react'
import { createTheme, Theme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

interface ThemeContextType {
    theme: string
    muiTheme: Theme
    changeTheme: (theme: string) => void
}

const defaultContextValue: ThemeContextType = {
    theme: 'light',
    muiTheme: createTheme({
        palette: {
            mode: 'light',
        },
    }),
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

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme as PaletteMode | undefined,
                },
            }),
        [theme]
    )

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
        <ThemeContext.Provider value={{ theme, muiTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
