'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineCategory, MdOutlineDashboard } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton'
import { PiSignOut } from 'react-icons/pi'
import { FiMenu } from 'react-icons/fi'

const Sidebar = () => {
    const [toggle, setToggle] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {pathname == '/' ||
            pathname == '/signup' ||
            pathname == '/signin' ||
            pathname == '/signout' ? null : (
                <aside className="sticky left-0 top-0 h-dvh min-w-60 bg-base-200">
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
                                <div onClick={() => setToggle((prev) => !prev)}>
                                    <FiMenu className="text-2xl" />
                                </div>
                            </div>
                            <ul className="menu w-full gap-2 rounded-box p-4">
                                <li>
                                    <Link
                                        href={'/dashboard'}
                                        className={`${pathname == '/dashboard' ? 'active' : 'bg-none'}`}
                                    >
                                        <MdOutlineDashboard />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={'/category'}
                                        className={`${pathname == `/category` ? 'active' : 'bg-none'}`}
                                    >
                                        <MdOutlineCategory />
                                        Category
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="menu w-full gap-2 rounded-box p-4">
                            <li>
                                <Link
                                    href={'/settings'}
                                    className={`${pathname == `/settings` ? 'active' : 'bg-none'}`}
                                >
                                    <IoSettingsOutline />
                                    Settings
                                </Link>
                            </li>

                            {/* <li>
                                    <UpgradeButton userId={userDB.userId} />
                                </li> */}
                            <li>
                                <Link
                                    href={'/signout'}
                                    className="font-medium text-error"
                                >
                                    <PiSignOut /> Sign out
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
