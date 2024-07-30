import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import Client from './Client/Client'

const Sidebar = async () => {
    const user = await authUserSessionServer()
    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    const categoryDB = await prisma.category.findMany({
        where: { userId: userDB?.userId },
    })

    return <Client userDB={userDB} categoryDB={categoryDB} />
}

export default Sidebar
