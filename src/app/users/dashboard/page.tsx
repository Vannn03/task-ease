import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { Suspense } from 'react'
import Loading from './loading'
import Calendar from '@/components/data-display/Calendar'
import CategoryList from '@/components/data-display/CategoryList'
import dayjs from 'dayjs'
import Link from 'next/link'
import AddCategoryButton from '@/components/buttons/categoryButtons/AddCategoryButton'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    console.time('CALENDAR DASHBOARD')
    const nearestTaskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
            status: 'Incomplete',
        },
        select: {
            taskId: true,
            taskDescription: true,
            status: true,
            deadline: true,
        },
        orderBy: { deadline: 'asc' },
        take: 4,
    })
    console.timeEnd('CALENDAR DASHBOARD')

    console.time('BARCHART DASHBOARD')
    const taskDB = await prisma.task.findMany({
        where: {
            category: { userId: loggedUser?.userId },
            createdAt: {
                gte: dayjs().subtract(6, 'day').startOf('day').toDate(),
            },
        },
        select: {
            status: true,
            createdAt: true,
            deadline: true,
        },
    })
    console.timeEnd('BARCHART DASHBOARD')

    console.time('CATEGORY LIST')
    const categoryDB = await prisma.category.findMany({
        where: { userId: loggedUser?.userId },
        select: {
            categoryId: true,
            categoryName: true,
            tasks: {
                select: {
                    status: true,
                },
            },
        },
        take: 4,
    })
    console.timeEnd('CATEGORY LIST')

    // Prepare data for the chart
    const datasets = Array.from({ length: 5 }).map((_, index) => {
        const date = dayjs().add(index, 'day').startOf('day')

        // Filter tasks that are due on the specific day
        const tasksForDay = taskDB.filter((task) =>
            dayjs(task.deadline).isSame(date, 'day')
        )

        // Calculate total tasks and completed tasks for the day
        const totalTasks = tasksForDay.length
        const completedTasks = tasksForDay.filter(
            (task) => task.status === 'Completed'
        ).length

        // Calculate the completion percentage
        const completionPercentage =
            totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

        return {
            day: date.format('DD MMM'),
            completionPercentage: parseFloat(completionPercentage.toFixed(2)), // Ensure precision
        }
    })

    return (
        <Suspense fallback={<Loading />}>
            <div className="z-40 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
                <main className="flex w-full flex-col gap-4 sm:gap-6">
                    <section className="flex h-fit w-full flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold sm:text-xl">
                                Recent Category
                            </h1>
                            <Link
                                href={'/users/category'}
                                className="btn btn-neutral btn-sm text-xs sm:text-sm"
                            >
                                View all
                            </Link>
                        </div>
                        {categoryDB.length == 0 ? (
                            <AddCategoryButton
                                userId={loggedUser?.userId}
                                version={loggedUser?.version}
                                dialogId={`addCategoryModal-${loggedUser?.userId}`}
                                // upgradeDialogId={`upgradeModalCategoryUsage-${loggedUser?.userId}`}
                                categoryLength={categoryDB.length}
                            />
                        ) : (
                            <div className="grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-2">
                                <CategoryList categoryDB={categoryDB} />
                            </div>
                        )}
                    </section>
                    <section className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Task Overview
                        </h1>
                        <BarChartCompletion datasets={datasets} />
                    </section>
                </main>
                <aside className="relative flex flex-col gap-4 rounded-lg bg-base-100 shadow sm:min-w-96">
                    <div className="flex items-center justify-between px-4 pt-4">
                        <h1 className="text-lg font-semibold sm:text-xl">
                            Calendar
                        </h1>
                        <Link
                            href={'/users/calendar'}
                            className="btn btn-neutral btn-sm text-xs sm:text-sm"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Calendar nearestTaskDB={nearestTaskDB} />
                    </div>
                </aside>
            </div>
        </Suspense>
    )
}

export default Page
