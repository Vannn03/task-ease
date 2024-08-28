import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import Navbar from './Navbar'
import prisma from '@/libs/prisma'

const NavSideBar = async () => {
    const user = await authUserSessionServer()

    if (!user) return null

    const loggedUser = await findLoggedUser(user)

    console.time('REMINDER')
    const taskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
        },
        select: {
            taskId: true,
            taskDescription: true,
            deadline: true,
            categoryId: true,
        },
    })
    console.timeEnd('REMINDER')

    const getCharName = loggedUser?.userName
        ?.split(' ')
        .map((word) => word.slice(0, 1))
        .join('')
        .toUpperCase()

    return (
        <Navbar
            userImage={loggedUser?.userImage as string}
            // userId={loggedUser?.userId}
            // version={loggedUser?.version}
            getCharName={getCharName}
            taskDB={taskDB}
        />
    )
}

export default NavSideBar
