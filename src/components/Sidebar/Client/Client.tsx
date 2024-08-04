'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineCategory, MdOutlineDashboard } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import UpgradeButton from '@/components/UpgradeButton'
import { PiSignOut } from 'react-icons/pi'

interface DbProps {
    userDB: any
}

const Client: React.FC<DbProps> = ({ userDB }) => {
    const pathname = usePathname()
    return (
        <>
            {pathname == '/' ||
            pathname == '/signup' ||
            pathname == '/signin' ||
            pathname == '/signout' ? null : (
                <aside className="h-dvh">
                    <div className="my-4 ml-4 flex items-center gap-4 rounded-2xl bg-base-200 p-4">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="..."
                                />
                            </div>
                        </div>
                        <div className="itemsc flex flex-col">
                            <h1 className="text-lg font-medium">
                                {userDB.userName}
                            </h1>
                            <div className="badge text-xs font-semibold">
                                {userDB.version}
                            </div>
                        </div>
                    </div>

                    <div className="my-4 ml-4 flex h-[86.5dvh] flex-col justify-between rounded-2xl bg-base-200 p-2">
                        <div>
                            <ul className="menu w-56 rounded-box">
                                <li>
                                    <Link
                                        href={'/dashboard'}
                                        className={`${pathname == '/dashboard' ? 'active' : 'bg-none'}`}
                                    >
                                        <MdOutlineDashboard />
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>

                            <ul className="menu w-56 rounded-box">
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
                        <div>
                            <ul className="menu w-56 rounded-box">
                                <li>
                                    <Link
                                        href={'/settings'}
                                        className={`${pathname == `/settings` ? 'active' : 'bg-none'}`}
                                    >
                                        <IoSettingsOutline />
                                        Settings
                                    </Link>
                                </li>
                            </ul>

                            <ul className="menu w-56 rounded-box">
                                <li>
                                    <UpgradeButton userId={userDB.userId} />
                                </li>
                            </ul>

                            <ul className="menu w-56 rounded-box">
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
                    </div>
                </aside>
            )}
        </>
    )
}

export default Client
