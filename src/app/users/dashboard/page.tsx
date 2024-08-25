import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { Suspense } from 'react'
import Loading from './loading'
import Calendar from '@/components/data-display/Calendar'
import CategoryList from '@/components/data-display/CategoryList'
import dayjs from 'dayjs'
import Link from 'next/link'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const nearestTaskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
            status: 'Incomplete',
        },
        orderBy: { deadline: 'asc' },
        include: { category: true },
    })

    const taskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
            createdAt: {
                gte: dayjs().subtract(6, 'day').startOf('day').toDate(),
            },
        },
    })

    // Prepare data for the chart
    const datasets = Array.from({ length: 7 }).map((_, index) => {
        const date = dayjs()
            .subtract(6 - index, 'day')
            .startOf('day')

        const tasksForDay = taskDB.filter((task) =>
            dayjs(task.createdAt).isSame(date, 'day')
        )

        return {
            day: date.format('DD MMM'),
            created: tasksForDay.length,
        }
    })

    return (
        <Suspense fallback={<Loading />}>
            <div className="z-40 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
                <main className="flex w-full flex-col gap-4 sm:gap-6">
                    <section className="flex h-fit w-full flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold sm:text-xl">
                                Recent Category
                            </h1>
                            <Link
                                href={'/users/category'}
                                className="btn btn-neutral btn-sm"
                            >
                                View more
                            </Link>
                        </div>
                        <CategoryList
                            userId={loggedUser?.userId}
                            version={loggedUser?.version}
                        />
                    </section>
                    <section className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Task Overview
                        </h1>
                        <BarChartCompletion datasets={datasets} />
                    </section>
                </main>
                <aside className="relative flex flex-col gap-4 rounded-lg bg-base-100 shadow sm:min-w-96">
                    <h1 className="px-4 pt-4 text-lg font-semibold sm:text-xl">
                        Calendar
                    </h1>
                    <Calendar nearestTaskDB={nearestTaskDB} />
                </aside>
            </div>
        </Suspense>
    )
}

export default Page
