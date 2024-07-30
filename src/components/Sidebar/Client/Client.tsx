'use client'

import React from 'react'
import Navlinks from '../Navlinks/Navlinks'
import { usePathname } from 'next/navigation'

interface DbProps {
    userDB: any
    categoryDB: any
}

const Client: React.FC<DbProps> = ({ userDB, categoryDB }) => {
    const pathname = usePathname()
    return (
        <>
            {pathname == '/' ||
            pathname == '/signup' ||
            pathname == '/signin' ||
            pathname == '/signout' ? null : (
                <aside className="h-dvh bg-base-200">
                    <div className="flex items-center gap-4 bg-neutral px-6 py-4">
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="..."
                                />
                            </div>
                        </div>
                        <div className="itemsc flex flex-col gap-1">
                            <h1 className="text-lg font-medium text-neutral-content">
                                {userDB.userName}
                            </h1>
                            <div className="badge text-xs font-semibold">
                                {userDB.version}
                            </div>
                        </div>
                    </div>

                    <Navlinks categoryDB={categoryDB} />
                </aside>
            )}
        </>
    )
}

export default Client
