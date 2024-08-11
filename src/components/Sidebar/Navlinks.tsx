'use client'

import {
    ChartColumnStacked,
    LayoutDashboard,
    LogOut,
    Menu,
    Palette,
    Settings,
} from 'lucide-react'
import Link from 'next/link'
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton'
import { usePathname } from 'next/navigation'
import ThemeController from '../ThemeController/ThemeController'

interface NavlinksProps {
    userImage?: string
    userName?: string
    version?: string
}

const Navlinks = ({ userImage, userName, version }: NavlinksProps) => {
    const pathname = usePathname()

    const toggleMenu = (route: string) => {
        return pathname == route ? 'active' : 'bg-none'
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="..." className="w-6" />
                        <h1 className="text-lg font-semibold">TaskEase</h1>
                    </div>
                    <button className="btn btn-ghost">
                        <Menu />
                    </button>
                </div>
                <ul className="menu w-full gap-3 rounded-box px-4 py-3">
                    <li>
                        <Link
                            href={'/users/dashboard'}
                            className={`${toggleMenu('/users/dashboard')}`}
                        >
                            <LayoutDashboard />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/users/category'}
                            className={`${toggleMenu('/users/category')}`}
                        >
                            <ChartColumnStacked />
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/users/settings'}
                            className={`${toggleMenu('/users/settings')}`}
                        >
                            <Settings />
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-base-200 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-14 rounded-xl">
                            <img src={userImage} alt="..." />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1>{userName}</h1>
                        <span className="badge badge-neutral">{version}</span>
                    </div>
                </div>
                <Link href={'/api/auth/signout'} className="text-error">
                    <LogOut />
                </Link>
            </div>

            {/* <li>
                                    <UpgradeButton userId={userDB.userId} />
                                </li> */}
            {/* <li>
                                <Link
                                    href={'/api/auth/signout'}
                                    className="font-medium text-error"
                                >
                                    <LogOut /> Sign out
                                </Link>
                            </li> */}
        </>
    )
}

export default Navlinks
