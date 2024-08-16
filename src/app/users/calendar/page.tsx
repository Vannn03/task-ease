import DeleteTaskButton from '@/components/buttons/taskButtons/DeleteTaskButton'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import {
    getDayFromISODateTimeLocale,
    getDeadlineColor,
    getMonthFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import { findLoggedUser } from '@/utils/prisma-utils'
import { CalendarClock } from 'lucide-react'

const Page = async () => {
    const dateNow = new Date()
    const next7Days = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(dateNow)
        date.setDate(dateNow.getDate() + index)
        return date
    })

    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const tasksPerDay = await Promise.all(
        next7Days.map(async (date) => {
            const startOfDay = new Date(date.setHours(0, 0, 0, 0))
            const endOfDay = new Date(date.setHours(23, 59, 59, 999))

            const taskDB = await prisma.task.findMany({
                where: {
                    category: { userId: loggedUser?.userId },
                    deadline: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
            })
            return { date, tasks: taskDB }
        })
    )

    return (
        <div className="w-full p-6">
            <div className="grid grid-cols-7 gap-6">
                {tasksPerDay.map(({ date, tasks }, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="stats shadow">
                            <div className="stat text-center">
                                <div className="stat-value">
                                    {getDayFromISODateTimeLocale(date)}
                                </div>
                                <div className="stat-title">
                                    {getMonthFromISODateTimeLocale(date)}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div key={task.taskId}>
                                        <div
                                            className={`flex items-center justify-between rounded-lg border p-3 ${getDeadlineColor(
                                                dateNow,
                                                task.deadline
                                            )}`}
                                        >
                                            <span className="flex gap-2">
                                                <CalendarClock className="mt-[2px] size-4" />
                                                <span className="flex flex-col">
                                                    <p className="text-sm font-medium">
                                                        {getTimeFromISODateTimeLocale(
                                                            task.deadline
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-base-content">
                                                        {task.taskDescription}
                                                    </p>
                                                </span>
                                            </span>
                                            <DeleteTaskButton
                                                taskId={task.taskId}
                                                taskDescription={
                                                    task.taskDescription
                                                }
                                                dialogId={`deleteTaskModal-${task.taskId}`}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center font-medium opacity-50">
                                    No tasks
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
