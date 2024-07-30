'use client'

import ThemeController from '@/components/ThemeController'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PiSignOut } from 'react-icons/pi'

const Navlinks = ({ categoryDB }: any) => {
    const pathname = usePathname()

    return (
        <div className="px-4 py-2">
            <ul className="menu w-56 rounded-box">
                <li>
                    <h2 className="menu-title">Home</h2>
                    <ul>
                        <li>
                            <Link
                                href={'/dashboard'}
                                className={`${pathname == '/dashboard' ? 'active' : 'bg-none'}`}
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul className="menu w-56 rounded-box">
                <li>
                    <h2 className="menu-title">Category</h2>
                    <ul>
                        {categoryDB.length === 0 ? (
                            <li className="disabled">
                                <p>No category found</p>
                            </li>
                        ) : (
                            <>
                                {categoryDB.map((data: any) => (
                                    <li key={data.categoryId}>
                                        <Link
                                            href={`/category/${data.categoryId}`}
                                            className={`${pathname == `/category/${data.categoryId}` ? 'active' : 'bg-none'}`}
                                        >
                                            {data.categoryName}
                                        </Link>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </li>
            </ul>

            <ul className="menu w-56 rounded-box">
                <li>
                    <h2 className="menu-title">Settings</h2>
                    <ul>
                        <li>
                            <Link href={''}>Edit Profile</Link>
                            <ThemeController />
                        </li>
                    </ul>
                </li>
            </ul>

            <ul className="menu w-56 rounded-box bg-base-200">
                <li>
                    <Link href={'/signout'} className="font-medium text-error">
                        <PiSignOut /> Sign out
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navlinks
