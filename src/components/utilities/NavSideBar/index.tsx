import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import Navbar from './Navbar'

const NavSideBar = async () => {
    const user = await authUserSessionServer()

    if (!user) return null

    const loggedUser = await findLoggedUser(user)

    const getCharName = loggedUser?.userName
        ?.split(' ')
        .map((word) => word.slice(0, 1))
        .join('')

    return (
        <Navbar
            userImage={loggedUser?.userImage as string}
            getCharName={getCharName}
        />
    )
}

export default NavSideBar
