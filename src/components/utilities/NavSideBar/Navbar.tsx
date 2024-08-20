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
    status: string
    order: number
    deadline: Date
    createdAt: Date
    updatedAt: Date
    category: {
        categoryId: string
        categoryName: string
    }
}

interface NavbarProps {
    userImage?: string
    // userId?: string
    // version?: string
    getCharName?: string
    taskDB: Task[]
}

const Navbar = ({
    userImage,
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
                        className="btn btn-ghost btn-sm md:btn-md"
                        onClick={() => {
                            setToggle((prev) => !prev)
                        }}
                    >
                        <Menu />
                    </button>

                    <div className="flex items-center gap-6">
                        <Reminder
                            taskDB={taskDB}
                            // userId={userId}
                            // version={version}
                        />
                        {userImage == null ? (
                            <div className="avatar placeholder">
                                <div className="w-10 rounded-full bg-neutral text-neutral-content sm:w-14">
                                    <span>{getCharName}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="avatar">
                                <div className="w-10 rounded-full sm:w-14">
                                    <img src={userImage} alt="User Avatar" />
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
