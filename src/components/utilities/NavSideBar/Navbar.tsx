'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

interface NavbarProps {
    userImage?: string
    getCharName?: string
}

const Navbar = ({ userImage, getCharName }: NavbarProps) => {
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <div
                className={`${toggle ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-50 h-full w-full bg-neutral/75 transition-all`}
                onClick={() => setToggle(false)}
            />
            <div className="sticky left-0 top-0 z-50 float-left flex">
                <Sidebar toggle={toggle} />
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
                </nav>
            </div>
        </>
    )
}

export default Navbar
