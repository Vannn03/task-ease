import { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa6'

const ThemeController = () => {
    const [hoverTheme, setHoverTheme] = useState(false)

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
                <li className="menu-title">Default</li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Light"
                        value="light"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Dark"
                        value="dark"
                    />
                </li>
                <li className="menu-title">Seasons</li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Autumn"
                        value="autumn"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Winter"
                        value="winter"
                    />
                </li>
                <li className="menu-title">Foods & Drinks</li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Cupcake"
                        value="cupcake"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Coffee"
                        value="coffee"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Lemonade"
                        value="lemonade"
                    />
                </li>
                <li className="menu-title">Specials</li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Halloween"
                        value="halloween"
                    />
                </li>
                <li>
                    <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label="Valentine"
                        value="valentine"
                    />
                </li>
            </ul>
        </span>
    )
}

export default ThemeController
