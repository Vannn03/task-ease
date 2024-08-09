'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton'
import {
    ChartColumnStacked,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
} from 'lucide-react'

const Sidebar = () => {
    const pathname = usePathname()

    const toggleMenu = (route: string) => {
        return pathname == route ? 'active' : 'bg-none'
    }

    return (
        <>
            {pathname == '/' ||
            pathname == '/signup' ||
            pathname == '/signin' ||
            pathname == '/signout' ? null : (
                <aside className="sticky left-0 top-0 z-50 h-dvh min-w-60 bg-base-200">
                    <div className="flex h-full flex-col justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between bg-base-300 p-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/logo.svg"
                                        alt="..."
                                        className="w-6"
                                    />
                                    <h1 className="text-lg font-semibold">
                                        TaskEase
                                    </h1>
                                </div>
                                <div>
                                    <Menu />
                                </div>
                            </div>
                            <ul className="menu w-full gap-2 rounded-box p-4">
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
                            </ul>
                        </div>
                        <ul className="menu w-full gap-2 rounded-box p-4">
                            <li>
                                <Link
                                    href={'/users/settings'}
                                    className={`${toggleMenu('/users/settings')}`}
                                >
                                    <Settings />
                                    Settings
                                </Link>
                            </li>

                            {/* <li>
                                    <UpgradeButton userId={userDB.userId} />
                                </li> */}
                            <li>
                                <Link
                                    href={'/api/auth/signout'}
                                    className="font-medium text-error"
                                >
                                    <LogOut /> Sign out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            )}
        </>
    )
}

export default Sidebar
