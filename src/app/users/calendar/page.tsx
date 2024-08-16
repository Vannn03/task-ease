import dayjs from 'dayjs'
import DeleteTaskButton from '@/components/buttons/taskButtons/DeleteTaskButton'
import prisma from '@/libs/prisma'
import { getDeadlineColor, getISODateTimeLocale } from '@/utils/datetime'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { CalendarClock } from 'lucide-react'

const Page = async () => {
    const dateNow = dayjs() // Using dayjs for current date
    const next7Days = Array.from({ length: 7 }).map((_, index) => {
        return dateNow.add(index, 'day') // Adding days using dayjs
    })

    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const tasksPerDay = await Promise.all(
        next7Days.map(async (date) => {
            const startOfDay = date.startOf('day').toDate() // Start of the day using dayjs
            const endOfDay = date.endOf('day').toDate() // End of the day using dayjs

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
        <div className="grid grid-cols-7 gap-6 p-6">
            {tasksPerDay.map(({ date, tasks }, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="stats shadow">
                        <div className="stat text-center">
                            <div className="stat-value">
                                {getISODateTimeLocale(date.toDate(), 'D')}
                            </div>
                            <div className="stat-title">
                                {getISODateTimeLocale(date.toDate(), 'MMM')}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <div key={task.taskId}>
                                    <div
                                        className={`flex items-center justify-between rounded-lg border p-3 ${getDeadlineColor(
                                            dateNow.toDate(),
                                            task.deadline
                                        )}`}
                                    >
                                        <span className="flex gap-2">
                                            <CalendarClock className="mt-[2px] size-4" />
                                            <span className="flex flex-col">
                                                <p className="text-sm font-medium">
                                                    {getISODateTimeLocale(
                                                        task.deadline,
                                                        'HH:mm'
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
    )
}

export default Page
