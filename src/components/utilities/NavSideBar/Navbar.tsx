'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Reminder from './Reminder'

interface Task {
    taskId: string
    taskDescription: string
    deadline: Date
    categoryId: string
}

interface NavbarProps {
    userImage?: string
    userName?: string
    // userId?: string
    // version?: string
    getCharName?: string
    taskDB: Task[]
}

const Navbar = ({
    userImage,
    userName,
    // userId,
    // version,
    getCharName,
    taskDB,
}: NavbarProps) => {
    const [toggle, setToggle] = useState(false)
    const pathname = usePathname()

    if (!pathname.includes('/users')) {
        return null
    }

    return (
        <>
            <div
                className={`${toggle ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-50 h-full w-full bg-neutral/75 transition-all`}
                onClick={() => setToggle(false)}
            />
            <div className="sticky left-0 top-0 z-50 float-left flex">
                <Sidebar toggle={toggle} setToggle={setToggle} />
            </div>

            <div className="sticky top-0 z-50 flex">
                <nav className="float-start flex w-full items-center justify-between bg-base-100 px-4 py-2">
                    <button
                        className="btn btn-square btn-ghost btn-sm md:btn-md"
                        onClick={() => {
                            setToggle((prev) => !prev)
                        }}
                    >
                        <Menu className="size-5 sm:size-6" />
                    </button>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Reminder
                            taskDB={taskDB}
                            // userId={userId}
                            // version={version}
                        />
                        <Link
                            href={'/users/settings'}
                            className="flex cursor-pointer items-center gap-3 rounded-full px-3 py-1 transition-colors hover:bg-base-200"
                        >
                            <p className="hidden text-base font-medium sm:flex">
                                {userName}
                            </p>
                            {userImage == null ? (
                                <div className="avatar placeholder">
                                    <div className="w-10 rounded-full bg-neutral text-neutral-content sm:w-12">
                                        <span>{getCharName}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="avatar">
                                    <div className="w-10 rounded-full sm:w-12">
                                        <img
                                            src={userImage}
                                            alt="User Avatar"
                                        />
                                    </div>
                                </div>
                            )}
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
