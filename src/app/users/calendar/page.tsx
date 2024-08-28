import Calendar from '@/components/data-display/Calendar'
import prisma from '@/libs/prisma'
import { authUserSessionServer, findLoggedUser } from '@/utils/auth-utils'
import { Suspense } from 'react'
import Loading from './loading'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    console.time('CALENDAR PAGE')
    const nearestTaskDB = await prisma.task.findMany({
        where: {
            category: {
                userId: loggedUser?.userId,
            },
            status: 'Incomplete',
        },
        select: {
            taskId: true,
            taskDescription: true,
            status: true,
            deadline: true,
        },
        orderBy: {
            deadline: 'asc',
        },
    })
    console.timeEnd('CALENDAR PAGE')

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row">
                <Calendar nearestTaskDB={nearestTaskDB} />
            </div>
        </Suspense>
    )
}

export default Page
