'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import { ChangeEvent, useContext, useEffect, useState } from 'react'

const ThemeController = () => {
    // const [loading, setLoading] = useState(true)
    // const [theme, setTheme] = useState<any>(
    //     typeof window !== 'undefined'
    //         ? (localStorage.getItem('theme') as string)
    //         : 'light'
    // )

    // const handleToggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    //     e.target.checked ? setTheme('dark') : setTheme('light')
    // }

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('theme', theme)
    //         const localTheme = localStorage.getItem('theme')
    //         if (localTheme) {
    //             document
    //                 .querySelector('html')
    //                 ?.setAttribute('data-theme', localTheme)
    //         }
    //         setLoading(false)
    //     }
    // }, [theme])

    const { changeTheme }: any = useContext(ThemeContext)

    return (
        <>
            {/* <input
                type="checkbox"
                checked={theme === 'dark'}
                className="theme-controller toggle"
                onChange={handleToggleTheme}
            /> */}
            <button className="btn" onClick={() => changeTheme('light')}>
                Light
            </button>
            <button
                className="btn btn-neutral"
                onClick={() => changeTheme('dark')}
            >
                Dark
            </button>
        </>
    )
}

export default ThemeController
