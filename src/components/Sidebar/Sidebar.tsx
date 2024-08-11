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
                <aside className="sticky left-0 top-3 m-3 min-w-64 rounded-xl bg-base-300">
                    <div className="flex h-full flex-col justify-between">
                        <Navlinks
                            userImage={userDB?.userImage as string}
                            userName={userDB?.userName}
                            version={userDB?.version}
                        />
                    </div>
                </aside>
            )}
        </>
    )
}

export default Sidebar
