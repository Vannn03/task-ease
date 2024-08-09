import Calendar from '@/components/Calendar/Calendar'
import DashboardTable from '@/components/DashboardTable/DashboardTable'
import LiveClock from '@/components/LiveClock/LiveClock'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import { getFullDateFromISODateTimeLocale } from '@/utils/datetime'

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

    const taskDB = await prisma.task.findMany()
    const completedTaskLength = taskDB.filter(
        (task) => task.status == 'Completed'
    ).length
    const completedTaskPercentage = (completedTaskLength * 100) / taskDB.length

    return (
        <div className="z-40 flex h-dvh w-full flex-col gap-6 p-8">
            <div className="absolute left-0 top-0 -z-10 h-40 w-full bg-neutral" />

            <nav className="flex items-center justify-between text-neutral-content">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Hello, {userDB?.userName}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end gap-1">
                        <p className="text-sm font-medium">
                            {userDB?.userName}
                        </p>
                        <span className="badge badge-ghost">
                            {userDB?.version}
                        </span>
                    </div>
                    <img
                        src={userDB?.userImage as string}
                        alt="..."
                        className="mask mask-squircle size-12"
                    />
                </div>
            </nav>
            <div className="flex h-full gap-6">
                <main className="flex w-full flex-col gap-6">
                    <section className="flex gap-6">
                        <div className="flex w-fit flex-col gap-2 rounded bg-base-100 p-6 shadow-xl">
                            <LiveClock />
                            <p className="text-nowrap">
                                {getFullDateFromISODateTimeLocale(dateNow)}
                            </p>
                        </div>
                        <div className="w-full rounded bg-base-100 p-6 shadow-xl">
                            <span className="flex justify-between">
                                <h1>Completed Task</h1>
                                <p>{completedTaskPercentage}%</p>
                            </span>
                            <progress
                                className="progress progress-success w-full"
                                value={completedTaskPercentage}
                                max="100"
                            ></progress>
                        </div>
                    </section>
                    <section
                        role="tablist"
                        className="tabs tabs-bordered bg-base-100"
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
                </main>
                <aside className="h-full rounded-xl bg-base-200 p-6">
                    <Calendar dateNow={dateNow} nearestTaskDB={nearestTaskDB} />
                </aside>
            </div>
        </div>
    )
}

export default Page
