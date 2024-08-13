'use client'

import {
    Calendar,
    ChartColumnStacked,
    LayoutDashboard,
    LogOut,
    Menu,
    MenuIcon,
    Settings,
} from 'lucide-react'
import Link from 'next/link'
import UpgradeButton from '@/components/buttons/UpgradeButton/UpgradeButton'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavlinksProps {
    userImage?: string
    userName?: string
    version?: string
}

type MenuDataType = {
    menuName: string
    menuIcon: any
    menuLink: string
}

const Navlinks = ({ userImage, userName, version }: NavlinksProps) => {
    const pathname = usePathname()
    const [toggle, setToggle] = useState(false)

    const menuData: MenuDataType[] = [
        {
            menuName: 'Dashboard',
            menuIcon: <LayoutDashboard />,
            menuLink: '/users/dashboard',
        },
        {
            menuName: 'Category',
            menuIcon: <ChartColumnStacked />,
            menuLink: '/users/category',
        },
        {
            menuName: 'Calendar',
            menuIcon: <Calendar />,
            menuLink: '/users/calendar',
        },
        {
            menuName: 'Settings',
            menuIcon: <Settings />,
            menuLink: '/users/settings',
        },
    ]

    const handleMenuChange = (route: string) => {
        return pathname == route ? 'active' : 'bg-none'
    }

    return (
        <aside
            className={`sticky left-0 top-3 z-50 m-3 ${!toggle ? 'min-w-72' : 'w-fit'} rounded-xl bg-primary-content`}
        >
            <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div
                            className={`${!toggle ? 'flex' : 'hidden'} items-center gap-2`}
                        >
                            <img src="/logo.svg" alt="..." className="w-6" />
                            <h1 className="text-lg font-semibold">TaskEase</h1>
                        </div>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setToggle((prev) => !prev)}
                        >
                            <Menu />
                        </button>
                    </div>
                    <ul className="menu w-full gap-3 rounded-box px-4 py-3">
                        {menuData.map((data, index) => (
                            <li
                                className={`${!toggle ? null : 'tooltip tooltip-right'}`}
                                data-tip="Dashboard"
                                key={index}
                            >
                                <Link
                                    href={data.menuLink}
                                    className={`${handleMenuChange(data.menuLink)}`}
                                >
                                    {data.menuIcon}
                                    <p
                                        className={`${!toggle ? 'flex' : 'hidden'}`}
                                    >
                                        {data.menuName}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className={`m-4 flex items-center justify-between rounded-lg bg-base-100 ${!toggle ? 'px-3 py-2' : 'p-0'}`}
                >
                    <div
                        className={`${!toggle ? 'flex' : 'hidden'} items-center gap-3`}
                    >
                        <div className="avatar">
                            <div className="w-14 rounded-xl">
                                <img src={userImage} alt="..." />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1>{userName}</h1>
                            <span className="badge badge-neutral">
                                {version}
                            </span>
                        </div>
                    </div>
                    <Link
                        href={'/api/auth/signout'}
                        className="btn btn-ghost text-error"
                    >
                        <LogOut />
                    </Link>
                </div>
            </div>
        </aside>
    )
}

export default Navlinks
