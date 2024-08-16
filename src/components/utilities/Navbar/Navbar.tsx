import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import { findLoggedUser } from '@/utils/prisma-utils'

const Navbar = async () => {
    const user = await authUserSessionServer()

    if (!user) return null

    const loggedUser = await findLoggedUser(user)

    const getCharName = loggedUser?.userName
        ?.split(' ')
        .map((word) => word.slice(0, 1))
        .join('')

    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 px-6 py-2">
            <label className="input input-sm input-bordered flex items-center gap-2 sm:input-md">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            {loggedUser?.userImage == null ? (
                <div className="avatar placeholder">
                    <div className="w-10 rounded-full bg-neutral text-neutral-content sm:w-14">
                        <span>{getCharName}</span>
                    </div>
                </div>
            ) : (
                <div className="avatar">
                    <div className="w-10 rounded-full sm:w-14">
                        <img src={loggedUser.userImage} alt="..." />
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
