import DashboardTable from '@/components/data-display/DashboardTable'
import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { Suspense } from 'react'
import Loading from './loading'
import Calendar from '@/components/data-display/Calendar'

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

    const categories = await prisma.category.findMany({
        where: { userId: loggedUser?.userId },
    })

    // Prepare data for the chart
    const datasets = await Promise.all(
        categories.map(async (data) => {
            const tasks = await prisma.task.findMany({
                where: { categoryId: data.categoryId },
            })

            const completedTasks = tasks.filter(
                (task) => task.status === 'Completed'
            ).length

            const completedTaskPercentage = tasks.length
                ? (completedTasks * 100) / tasks.length
                : 0

            return {
                category: data.categoryName,
                completion: completedTaskPercentage,
            }
        })
    )

    return (
        <Suspense fallback={<Loading />}>
            <div className="z-40 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
                <main className="flex w-full flex-col gap-4 sm:gap-6">
                    <section className="relative flex flex-col gap-2 rounded bg-base-100 p-4 shadow">
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Latest Task
                        </h1>
                        <DashboardTable userId={loggedUser?.userId} />
                    </section>
                    <section className="flex flex-col gap-2 rounded bg-base-100 p-4 shadow">
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Category Overview
                        </h1>
                        <BarChartCompletion datasets={datasets} />
                    </section>
                </main>
                <aside className="relative flex flex-col rounded bg-base-100 p-4 shadow">
                    <h1 className="text-lg font-semibold sm:text-xl">
                        Calendar
                    </h1>
                    <Calendar nearestTaskDB={nearestTaskDB} />
                </aside>
            </div>
        </Suspense>
    )
}

export default Page
