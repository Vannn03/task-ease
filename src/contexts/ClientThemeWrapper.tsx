'use client'

import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { ThemeProvider as MuiThemeProvider } from '@/libs/mui'

export default function ClientThemeWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const { theme, muiTheme } = useContext(ThemeContext)

    return (
        <MuiThemeProvider theme={muiTheme}>
            <div data-theme={theme}>{children}</div>
        </MuiThemeProvider>
    )
}
