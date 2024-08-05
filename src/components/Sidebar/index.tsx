import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import Client from './Client'

const Sidebar = async () => {
    const user = await authUserSessionServer()
    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    return <Client userDB={userDB} />
}

export default Sidebar
