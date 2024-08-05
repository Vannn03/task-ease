'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdOutlineCategory, MdOutlineDashboard } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import UpgradeButton from '@/components/UpgradeButton/UpgradeButton'
import { PiSignOut } from 'react-icons/pi'
import { CgProfile } from 'react-icons/cg'

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
                    <div className="flex h-full flex-col justify-between bg-base-200">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 bg-neutral p-4">
                                {userDB?.userImage === null ? (
                                    <CgProfile className="text-2xl" />
                                ) : (
                                    <img
                                        src={userDB?.userImage}
                                        alt="..."
                                        className="w-12 rounded-full"
                                    />
                                )}
                                <div className="itemsc flex flex-col">
                                    <h1 className="text-lg font-medium text-neutral-content">
                                        {userDB.userName}
                                    </h1>
                                    <div className="badge text-xs font-semibold">
                                        {userDB.version}
                                    </div>
                                </div>
                            </div>
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
