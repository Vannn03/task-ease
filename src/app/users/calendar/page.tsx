import Calendar from '@/components/data-display/Calendar'
import prisma from '@/libs/prisma'
import { authUserSessionServer, findLoggedUser } from '@/utils/auth-utils'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const nearestTaskDB = await prisma.task.findMany({
        where: {
            category: {
                userId: loggedUser?.userId,
            },
            status: 'Incomplete',
        },
        orderBy: {
            deadline: 'asc',
        },
        include: {
            category: true,
        },
    })

    return (
        <div className="flex flex-col gap-6 p-6 md:flex-row">
            <Calendar nearestTaskDB={nearestTaskDB} />
        </div>
    )
}

export default Page
