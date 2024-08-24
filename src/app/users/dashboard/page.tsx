import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { Suspense } from 'react'
import Loading from './loading'
import Calendar from '@/components/data-display/Calendar'
import CategoryList from '@/components/data-display/CategoryList'
import AddCategoryButton from '@/components/buttons/categoryButtons/AddCategoryButton'
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

    const categoryDB = await prisma.category.findMany({
        where: { userId: loggedUser?.userId },
        orderBy: { createdAt: 'desc' },
    })

    // Prepare data for the chart
    const datasets = await Promise.all(
        categoryDB.slice(0, 4).map(async (data) => {
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
                    <section className="relative flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold sm:text-xl">
                                Recent Category
                            </h1>
                            <AddCategoryButton
                                userId={loggedUser?.userId}
                                version={loggedUser?.version}
                                dialogId={`addCategoryModal-${loggedUser?.userId}`}
                                // upgradeDialogId={`upgradeModalCategoryUsage-${loggedUser?.userId}`}
                                categoryLength={categoryDB.length}
                            />
                        </div>
                        <CategoryList categoryDB={categoryDB} />
                    </section>
                    <section className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold sm:text-xl">
                                Task Overview
                            </h1>
                            <Link
                                href={'/users/category'}
                                className="btn btn-sm"
                            >
                                View more
                            </Link>
                        </div>
                        <BarChartCompletion datasets={datasets} />
                    </section>
                </main>
                <aside className="relative flex flex-col gap-4 rounded-lg bg-base-100 shadow">
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
