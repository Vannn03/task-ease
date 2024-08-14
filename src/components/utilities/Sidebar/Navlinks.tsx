'use client'

import {
    CalendarRange,
    ChartColumnStacked,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, useState } from 'react'

type MenuDataType = {
    menuName: string
    menuIcon: ReactElement
    menuLink: string
}

const Navlinks = () => {
    const pathname = usePathname()
    const [toggle, setToggle] = useState(false)

    const menuData: MenuDataType[] = [
        {
            menuName: 'Dashboard',
            menuIcon: <LayoutDashboard className="size-5 md:size-6" />,
            menuLink: '/users/dashboard',
        },
        {
            menuName: 'Category',
            menuIcon: <ChartColumnStacked className="size-5 md:size-6" />,
            menuLink: '/users/category',
        },
        {
            menuName: 'Calendar',
            menuIcon: <CalendarRange className="size-5 md:size-6" />,
            menuLink: '/users/calendar',
        },
        {
            menuName: 'Settings',
            menuIcon: <Settings className="size-5 md:size-6" />,
            menuLink: '/users/settings',
        },
    ]

    const handleMenuChange = (route: string) => {
        return pathname == route ? 'active' : 'bg-none'
    }

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <aside
            className={`sticky left-0 top-0 z-50 h-dvh ${toggle ? 'min-w-60 max-w-60' : 'w-fit'} bg-base-100`}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-3 py-3 sm:px-4">
                    <div
                        className={`${toggle ? 'flex' : 'hidden'} items-center gap-2`}
                    >
                        <img src="/logo.svg" alt="..." className="w-6" />
                        <h1 className="text-lg font-semibold">TaskEase</h1>
                    </div>
                    <button
                        className="btn btn-ghost btn-sm md:btn-md"
                        onClick={() => setToggle((prev) => !prev)}
                    >
                        <Menu />
                    </button>
                </div>
                <ul className="menu w-full gap-3 rounded-box px-3 py-3 sm:px-4">
                    {menuData.map((data, index) => (
                        <li
                            className={`${toggle ? null : 'tooltip tooltip-right'}`}
                            data-tip={data.menuName}
                            key={index}
                        >
                            <Link
                                href={data.menuLink}
                                className={`${handleMenuChange(data.menuLink)}`}
                            >
                                {data.menuIcon}
                                <p className={`${toggle ? 'flex' : 'hidden'}`}>
                                    {data.menuName}
                                </p>
                            </Link>
                        </li>
                    ))}
                    <li
                        className={`${toggle ? null : 'tooltip tooltip-right'} text-error`}
                        data-tip="Sign Out"
                    >
                        <button onClick={handleSignOut}>
                            <LogOut className="size-5 md:size-6" />
                            <p className={`${toggle ? 'flex' : 'hidden'}`}>
                                Sign out
                            </p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Navlinks
