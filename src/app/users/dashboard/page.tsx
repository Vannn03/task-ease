import Calendar from '@/components/data-display/Calendar/Calendar'
import DashboardTable from '@/components/data-display/DashboardTable/DashboardTable'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion/BarChartCompletion'
import { CalendarRange, ListPlus, SquareKanban } from 'lucide-react'

const Page = async () => {
    const dateNow = new Date()
    const user = await authUserSessionServer()

    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    const nearestTaskDB = await prisma.task.findMany({
        where: {
            category: {
                userId: userDB?.userId,
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

    const latestTaskDB = await prisma.task.findMany({
        where: {
            category: {
                userId: userDB?.userId,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            category: true,
        },
    })

    const categories = await prisma.category.findMany({
        where: { userId: userDB?.userId },
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
        <div className="z-40 flex w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
            <main className="flex w-full flex-col gap-4 sm:gap-6">
                <section className="relative flex flex-col gap-4 rounded-2xl bg-base-100 p-4">
                    <div className="flex items-center gap-2">
                        <ListPlus className="size-7" />
                        <h1 className="text-xl font-medium">Newest Task</h1>
                    </div>
                    <DashboardTable taskDB={latestTaskDB} />
                </section>
                <section className="rounded-2xl bg-base-100 p-4">
                    <div className="flex items-center gap-2">
                        <SquareKanban className="size-7" />
                        <h1 className="text-xl font-medium">
                            Category Overview
                        </h1>
                    </div>
                    <BarChartCompletion datasets={datasets} />
                </section>
            </main>
            <aside className="relative flex flex-col justify-start rounded-2xl bg-base-100 p-4">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <CalendarRange className="size-7" />
                        <h1 className="text-xl font-medium">Calendar</h1>
                    </span>
                    <div className="flex xl:hidden">
                        <button className="btn btn-sm">View more</button>
                    </div>
                </div>
                <Calendar dateNow={dateNow} nearestTaskDB={nearestTaskDB} />
            </aside>
        </div>
    )
}

export default Page
