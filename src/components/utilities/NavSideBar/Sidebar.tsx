'use client'

import {
    CalendarRange,
    ChartColumnStacked,
    LayoutDashboard,
    LogOut,
    Settings,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MenuDataType = {
    menuName: string
    menuIcon: React.ReactElement
    menuLink: string
}

interface SidebarProps {
    toggle: boolean
}

const Sidebar = ({ toggle }: SidebarProps) => {
    const pathname = usePathname()
    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

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
        return pathname == route ? 'active' : ''
    }

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <aside
            className={`h-dvh bg-base-100 transition-all ${isFixed && `fixed ${toggle ? 'left-0' : '-left-28'} top-14 float-none sm:top-[71.5px]`}`}
        >
            <div className={`flex items-center justify-center gap-2 px-4 py-3`}>
                <button className="btn">
                    <img src="/logo.svg" alt="TaskEase Logo" className="w-6" />
                    <h1
                        className={`overflow-hidden whitespace-nowrap transition-all ${toggle ? 'w-24' : 'w-0'} text-lg font-semibold`}
                    >
                        TaskEase
                    </h1>
                </button>
            </div>
            <ul className="menu w-full gap-3 rounded-box px-4 py-3">
                {menuData.map((data, index) => (
                    <li
                        className={`${toggle ? '' : 'tooltip tooltip-right'}`}
                        data-tip={data.menuName}
                        key={index}
                    >
                        <Link
                            href={data.menuLink}
                            className={handleMenuChange(data.menuLink)}
                        >
                            <span className="ml-1">{data.menuIcon}</span>
                            <p
                                className={`overflow-hidden whitespace-nowrap transition-all ${toggle ? 'w-40' : 'w-0'}`}
                            >
                                {data.menuName}
                            </p>
                        </Link>
                    </li>
                ))}
                <li
                    className={`${toggle ? '' : 'tooltip tooltip-right'} text-error`}
                    data-tip="Sign Out"
                >
                    <button onClick={handleSignOut}>
                        <LogOut className="ml-1 size-5 md:size-6" />
                        <p
                            className={`overflow-hidden whitespace-nowrap transition-all ${toggle ? 'w-40' : 'w-0'}`}
                        >
                            Sign out
                        </p>
                    </button>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
