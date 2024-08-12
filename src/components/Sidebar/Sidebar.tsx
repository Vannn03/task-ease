import { authUserSessionServer } from '@/libs/auth-libs'
import Navlinks from './Navlinks'
import prisma from '@/libs/prisma'

const Sidebar = async () => {
    const user = await authUserSessionServer()

    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    return (
        <>
            {!user ? null : (
                <Navlinks
                    userImage={userDB?.userImage as string}
                    userName={userDB?.userName}
                    version={userDB?.version}
                />
            )}
        </>
    )
}

export default Sidebar
