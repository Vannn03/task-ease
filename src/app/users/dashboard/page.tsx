import Calendar from '@/components/data-display/Calendar/Calendar'
import DashboardTable from '@/components/data-display/DashboardTable/DashboardTable'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import BarChartCompletion from '@/components/data-display/BarChartCompletion/BarChartCompletion'

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
        <div className="z-40 flex h-dvh w-full gap-6 p-8">
            <main className="flex w-full flex-col justify-between gap-6">
                <section
                    role="tablist"
                    className="tabs tabs-bordered relative bg-base-100"
                >
                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Nearest"
                        defaultChecked
                    />
                    <div role="tabpanel" className="tab-content p-2">
                        <DashboardTable taskDB={nearestTaskDB} />
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Latest"
                    />
                    <div role="tabpanel" className="tab-content p-2">
                        <DashboardTable taskDB={latestTaskDB} />
                    </div>
                </section>
                <section className="flex gap-6">
                    <BarChartCompletion datasets={datasets} />
                </section>
            </main>
            <aside className="flex flex-col justify-start rounded-xl">
                <Calendar dateNow={dateNow} nearestTaskDB={nearestTaskDB} />
            </aside>
        </div>
    )
}

export default Page
