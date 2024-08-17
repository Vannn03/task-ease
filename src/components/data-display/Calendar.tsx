'use client'

import { getISODateTimeLocale } from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { CalendarClock, Clock } from 'lucide-react'
import LiveClock from '@/components/LiveClock'
import TaskDrawer from '@/components/TaskDrawer'
import { Task } from '@prisma/client'
import { usePathname } from 'next/navigation'

interface CalendarProps {
    nearestTaskDB: any
}

const Calendar = ({ nearestTaskDB }: CalendarProps) => {
    const pathname = usePathname()
    const dateNow = dayjs()
    const fullDateFormat = 'dddd, D MMMM YYYY'

    const [selectedDate, setSelectedDate] = useState<string | null>(
        getISODateTimeLocale(dateNow.toDate(), fullDateFormat)
    )
    const [dailyTasks, setDailyTasks] = useState([])

    const filteredDailyTasks =
        pathname == '/users/dashboard' ? dailyTasks.slice(0, 3) : dailyTasks

    useEffect(() => {
        const filteredTasks = nearestTaskDB.filter(
            (task: Task) =>
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
    const now = dayjs(dateNow)

    const getDeadlineBorderColor = (deadline: Date) => {
        const taskTime = dayjs(deadline)
        const diffInMinutes = taskTime.diff(now, 'minute')

        if (diffInMinutes < 0) {
            return 'border-error'
        } else if (diffInMinutes <= 60) {
            return 'border-warning'
        } else {
            return ''
        }
    }
    const getDeadlineTextColor = (deadline: Date) => {
        const taskTime = dayjs(deadline)
        const diffInMinutes = taskTime.diff(now, 'minute')

        if (diffInMinutes < 0) {
            return 'text-error'
        } else if (diffInMinutes <= 60) {
            return 'text-warning'
        } else {
            return ''
        }
    }

    return (
        <>
            <div className="">
                <DateCalendar
                    value={dayjs(selectedDate)}
                    onChange={handleDateChange}
                    className="sticky top-20"
                />
            </div>
            <div className="flex w-full flex-col gap-4 border-t pt-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Clock className="size-6" />
                    <LiveClock />
                </div>
                {dailyTasks.length === 0 ? (
                    <p className="text-center font-medium opacity-35">
                        No task to display.
                    </p>
                ) : (
                    filteredDailyTasks.map((task: any) => (
                        <div
                            key={task.taskId}
                            className={`flex items-center justify-between rounded-lg border p-3 ${getDeadlineBorderColor(task.deadline)}`}
                        >
                            <span className="flex gap-2">
                                <CalendarClock
                                    className={`mt-[2px] size-4 ${getDeadlineTextColor(task.deadline)}`}
                                />
                                <span className="flex flex-col">
                                    <p
                                        className={`text-sm font-medium ${getDeadlineTextColor(task.deadline)}`}
                                    >
                                        {getISODateTimeLocale(
                                            task.deadline,
                                            'HH:mm'
                                        )}
                                    </p>
                                    <p className="max-w-52 overflow-x-hidden text-ellipsis whitespace-nowrap text-sm text-base-content">
                                        {task.taskDescription}
                                    </p>
                                </span>
                            </span>
                            <TaskDrawer
                                taskId={task.taskId}
                                taskDescription={task.taskDescription}
                                deadline={task.deadline}
                                categoryId={task.category.categoryId}
                                categoryName={task.category.categoryName}
                            />
                        </div>
                    ))
                )}
                {dailyTasks.length > 3 && pathname == '/users/dashboard' && (
                    <button className="btn">View more</button>
                )}
            </div>
        </>
    )
}

export default Calendar
