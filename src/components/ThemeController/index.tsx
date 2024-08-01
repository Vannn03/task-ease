'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'

const ThemeController = () => {
    const [hoverTheme, setHoverTheme] = useState(false)
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('theme') || 'light'
    )

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setTheme(e.target.value)
        }
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
        }
    }, [theme])

    return (
        <span
            className="flex justify-between"
            onMouseEnter={() => setHoverTheme(true)}
        >
            Themes <FaChevronRight />
            <ul
                className={`menu ${hoverTheme ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} absolute -right-64 w-56 rounded-box bg-base-200 transition-opacity`}
                onMouseLeave={() => setHoverTheme(false)}
            >
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Light"
                        value="light"
                        checked={theme === 'light'}
                        onChange={handleRadioChange}
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Dark"
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={handleRadioChange}
                    />
                </li>
            </ul>
        </span>
    )
}

export default ThemeController
