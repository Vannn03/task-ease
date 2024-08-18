'use client'

import { getISODateTimeLocale } from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import dayjs, { Dayjs } from 'dayjs'
import { useState, useMemo } from 'react'
import { CalendarClock, Clock } from 'lucide-react'
import LiveClock from '@/components/LiveClock'
import TaskDrawer from '@/components/TaskDrawer'
import { usePathname } from 'next/navigation'

interface Task {
    taskId: string
    taskDescription: string
    status: string
    deadline: Date
    category?: {
        categoryId: string
        categoryName: string
    }
}

interface CalendarProps {
    nearestTaskDB: Task[]
}

const Calendar = ({ nearestTaskDB }: CalendarProps) => {
    const pathname = usePathname()
    const dateNow = dayjs()
    const fullDateFormat = 'dddd, D MMMM YYYY'

    const [selectedDate, setSelectedDate] = useState<string | null>(
        getISODateTimeLocale(dateNow.toDate(), fullDateFormat)
    )

    const dailyTasks = useMemo(() => {
        return nearestTaskDB.filter(
            (task) =>
                getISODateTimeLocale(task.deadline, fullDateFormat) ===
                selectedDate
        )
    }, [selectedDate, nearestTaskDB])

    const filteredDailyTasks = useMemo(() => {
        return pathname === '/users/dashboard'
            ? dailyTasks.slice(0, 3)
            : dailyTasks
    }, [dailyTasks, pathname])

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            setSelectedDate(
                getISODateTimeLocale(newValue.toDate(), fullDateFormat)
            )
        }
    }

    const getDeadlineStyles = (deadline: Date) => {
        const taskTime = dayjs(deadline)
        const diffInMinutes = taskTime.diff(dateNow, 'minute')

        if (diffInMinutes < 0) {
            return { borderColor: 'border-error', textColor: 'text-error' }
        } else if (diffInMinutes <= 60) {
            return { borderColor: 'border-warning', textColor: 'text-warning' }
        }
        return { borderColor: '', textColor: '' }
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
                    filteredDailyTasks.map((task) => {
                        const { borderColor, textColor } = getDeadlineStyles(
                            task.deadline
                        )
                        return (
                            <div
                                key={task.taskId}
                                className={`flex items-center justify-between rounded-lg border p-3 ${borderColor}`}
                            >
                                <span className="flex gap-2">
                                    <CalendarClock
                                        className={`mt-[2px] size-4 ${textColor}`}
                                    />
                                    <span className="flex flex-col">
                                        <p
                                            className={`text-sm font-medium ${textColor}`}
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
                                    categoryId={task.category?.categoryId}
                                    categoryName={task.category?.categoryName}
                                />
                            </div>
                        )
                    })
                )}
                {dailyTasks.length > 3 && pathname === '/users/dashboard' && (
                    <button className="btn">View more</button>
                )}
            </div>
        </>
    )
}

export default Calendar
