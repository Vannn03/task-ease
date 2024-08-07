'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import { useContext } from 'react'

const ThemeController = () => {
    const { changeTheme }: any = useContext(ThemeContext)

    return (
        <>
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
