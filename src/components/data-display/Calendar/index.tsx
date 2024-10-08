'use client'

import { getISODateTimeLocale } from '@/utils/datetime'
import dayjs from 'dayjs'
import { useState, useMemo, useEffect } from 'react'
import { CalendarClock, Settings2 } from 'lucide-react'
import TaskDrawer from '@/components/DragDropTasks/TaskDrawer'
import { usePathname } from 'next/navigation'
import CalendarDate from './CalendarDate'

interface Task {
    taskId: string
    taskDescription: string
    status: string
    deadline: Date
}

interface CalendarProps {
    nearestTaskDB: Task[]
}

type StatisticType = {
    title: string
    value: number
}

const Calendar = ({ nearestTaskDB }: CalendarProps) => {
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const pathname = usePathname()
    const dateNow = dayjs()
    const fullDateFormat = 'dddd, D MMMM YYYY'

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
        setToggleDrawer(true)
    }

    // State to store the selected date
    const [selectedDate, setSelectedDate] = useState<string | null>(
        getISODateTimeLocale(dateNow.toDate(), fullDateFormat)
    )

    useEffect(() => {
        setSelectedDate(getISODateTimeLocale(dateNow.toDate(), fullDateFormat))
    }, [])

    // Memoized daily tasks filtered by the selected date
    const dailyTasks = useMemo(() => {
        return nearestTaskDB.filter(
            (task) =>
                getISODateTimeLocale(task.deadline, fullDateFormat) ===
                getISODateTimeLocale(
                    dayjs(selectedDate).toDate(),
                    fullDateFormat
                )
        )
    }, [selectedDate, nearestTaskDB, fullDateFormat])

    // Function to determine styles based on task deadline
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

    const statisticData: StatisticType[] = [
        {
            title: 'Tasks',
            value: dailyTasks.length,
        },
        {
            title: 'Late',
            value: dailyTasks.filter((task) => {
                const taskTime = dayjs(task.deadline)
                const diffInMinutes = taskTime.diff(dateNow, 'minute')
                return diffInMinutes < 0
            }).length,
        },
        {
            title: 'Near',
            value: dailyTasks.filter((task) => {
                const taskTime = dayjs(task.deadline)
                const diffInMinutes = taskTime.diff(dateNow, 'minute')
                return diffInMinutes > 0 && diffInMinutes <= 60
            }).length,
        },
    ]

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:flex-col lg:justify-start">
                <div className="top-24 lg:sticky">
                    <CalendarDate
                        selectedDate={dayjs(selectedDate)}
                        setSelectedDate={setSelectedDate}
                        nearestTaskDB={nearestTaskDB}
                    />
                </div>
                <div className="stats stats-horizontal top-[28rem] w-full rounded-lg sm:stats-vertical lg:stats-horizontal sm:w-fit lg:sticky lg:w-full">
                    {statisticData.map((data, index) => (
                        <div className="stat" key={index}>
                            <div className="text-xs opacity-50 sm:text-base">
                                {data.title}
                            </div>
                            <div
                                className={`text-2xl font-bold sm:text-3xl ${index == 1 && 'text-error'} ${index == 2 && 'text-warning'}`}
                            >
                                {data.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex h-fit w-full flex-col gap-4 rounded-lg bg-base-100 p-4">
                {dailyTasks.length === 0 ? (
                    <p className="text-center opacity-75">No task to display</p>
                ) : (
                    dailyTasks.slice(0, 3).map((task) => {
                        const { borderColor, textColor } = getDeadlineStyles(
                            task.deadline
                        )
                        return (
                            <div
                                key={task.taskId}
                                className={`flex items-center justify-between rounded-lg border p-3 ${borderColor} bg-base-100`}
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
                                        <p className="max-w-52 truncate text-sm text-base-content">
                                            {task.taskDescription}
                                        </p>
                                    </span>
                                </span>
                                <button
                                    className="btn btn-square btn-ghost btn-sm sm:btn-md"
                                    onClick={() => handleTaskClick(task)}
                                >
                                    <Settings2 className="size-4 opacity-50 sm:size-5" />
                                </button>
                            </div>
                        )
                    })
                )}
            </div>
            {selectedTask && (
                <TaskDrawer
                    taskId={selectedTask.taskId}
                    taskDescription={selectedTask.taskDescription}
                    deadline={selectedTask.deadline}
                    toggleDrawer={toggleDrawer}
                    setToggleDrawer={setToggleDrawer}
                />
            )}
        </>
    )
}

export default Calendar
