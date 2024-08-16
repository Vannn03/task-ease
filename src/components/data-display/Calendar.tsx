'use client'

import { getDeadlineColor, getISODateTimeLocale } from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { CalendarClock, Clock } from 'lucide-react'
import LiveClock from '@/components/LiveClock'
import DeleteTaskButton from '@/components/buttons/taskButtons/DeleteTaskButton'

interface CalendarProps {
    nearestTaskDB: Task[]
}

const Calendar = ({ nearestTaskDB }: CalendarProps) => {
    const dateNow = dayjs()
    const fullDateFormat = 'dddd, D MMMM YYYY'

    const [selectedDate, setSelectedDate] = useState<string | null>(
        getISODateTimeLocale(dateNow.toDate(), fullDateFormat)
    )
    const [dailyTasks, setDailyTasks] = useState<Task[]>([])

    useEffect(() => {
        const filteredTasks = nearestTaskDB.filter(
            (task) =>
                getISODateTimeLocale(task.deadline, fullDateFormat) ===
                selectedDate
        )
        setDailyTasks(filteredTasks)
    }, [selectedDate, nearestTaskDB])

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setSelectedDate(
                getISODateTimeLocale(newValue.toDate(), fullDateFormat)
            )
        }
    }

    return (
        <>
            <DateCalendar
                value={dayjs(selectedDate)}
                onChange={handleDateChange}
            />
            <div className="flex flex-col gap-4 border-t pt-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Clock className="size-6" />
                    <LiveClock />
                </div>
                {dailyTasks.length === 0 ? (
                    <p className="text-center font-medium opacity-35">
                        No task to display.
                    </p>
                ) : (
                    dailyTasks.slice(0, 3).map((task) => {
                        const isPastDeadline = dayjs(task.deadline) < dateNow
                        return (
                            <div
                                key={task.taskId}
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
                                {isPastDeadline && (
                                    <DeleteTaskButton
                                        taskId={task.taskId}
                                        taskDescription={task.taskDescription}
                                        dialogId={`deleteTaskModal-${task.taskId}`}
                                    />
                                )}
                            </div>
                        )
                    })
                )}
                {dailyTasks.length > 3 && (
                    <button className="btn">View more</button>
                )}
            </div>
        </>
    )
}

export default Calendar
