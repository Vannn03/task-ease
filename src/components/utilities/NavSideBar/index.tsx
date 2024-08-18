import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import Navbar from './Navbar'
import prisma from '@/libs/prisma'

const NavSideBar = async () => {
    const user = await authUserSessionServer()

    if (!user) return null

    const loggedUser = await findLoggedUser(user)

    const taskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
        },
        include: {
            category: true,
        },
    })

    const getCharName = loggedUser?.userName
        ?.split(' ')
        .map((word) => word.slice(0, 1))
        .join('')

    return (
        <Navbar
            userImage={loggedUser?.userImage as string}
            userName={loggedUser?.userName}
            version={loggedUser?.version}
            getCharName={getCharName}
            taskDB={taskDB}
        />
    )
}

export default NavSideBar
