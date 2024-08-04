'use client'

import { ChangeEvent, useEffect, useState } from 'react'

const ThemeController = () => {
    const [loading, setLoading] = useState(true)
    const [theme, setTheme] = useState<any>(
        typeof window !== 'undefined'
            ? (localStorage.getItem('theme') as string)
            : 'light'
    )

    const handleToggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? setTheme('dark') : setTheme('light')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme)
            const localTheme = localStorage.getItem('theme')
            if (localTheme) {
                document
                    .querySelector('html')
                    ?.setAttribute('data-theme', localTheme)
            }
            setLoading(false)
        }
    }, [theme])

    return (
        <>
            <input
                type="checkbox"
                checked={theme === 'dark'}
                className="theme-controller toggle"
                onChange={handleToggleTheme}
            />
        </>
    )
}

export default ThemeController
