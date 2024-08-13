'use client'

import {
    getFullDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { CalendarClock, Clock } from 'lucide-react'
import LiveClock from '../../LiveClock/LiveClock'
import DeleteTaskButton from '../../buttons/taskButtons/DeleteTaskButton'

interface CalendarProps {
    dateNow: Date
    nearestTaskDB: any
}

const Calendar = ({ dateNow, nearestTaskDB }: CalendarProps) => {
    const [value, setValue] = useState(
        getFullDateFromISODateTimeLocale(dateNow)
    )
    const [everyDayTaskDB, setEveryDayTaskDB] = useState<Task[]>([])

    useEffect(() => {
        const filteredTasks = nearestTaskDB.filter(
            (task: Task) =>
                getFullDateFromISODateTimeLocale(task.deadline) === value
        )
        setEveryDayTaskDB(filteredTasks)
    }, [value, nearestTaskDB])

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setValue(getFullDateFromISODateTimeLocale(newValue.toDate()))
        }
    }

    const getDeadlineColor = (deadline: Date) => {
        const taskTime = dayjs(deadline)
        const diffInMinutes = taskTime.diff(dateNow, 'minute')

        if (diffInMinutes < 0) {
            return 'border-error text-error'
        } else if (diffInMinutes <= 60) {
            return 'border-warning text-warning'
        } else {
            return 'border-info text-info'
        }
    }

    return (
        <>
            <DateCalendar
                value={dayjs(value)}
                onChange={handleDateChange}
                className="glass rounded-lg"
            />
            <div className="mt-4 flex flex-col gap-4">
                <div className="flex justify-between">
                    <p>Today&apos;s Task</p>
                    <span className="flex items-center gap-2">
                        <LiveClock />
                        <Clock className="size-4" />
                    </span>
                </div>
                {everyDayTaskDB
                    .map((data: Task) => (
                        <>
                            <div
                                key={data.taskId}
                                className={`flex items-center justify-between rounded-lg border p-3 ${getDeadlineColor(
                                    data.deadline
                                )}`}
                            >
                                <span className="flex gap-2">
                                    <CalendarClock className="mt-[2px] size-4" />
                                    <span className="flex flex-col">
                                        <p className="text-sm font-medium">
                                            {getTimeFromISODateTimeLocale(
                                                data.deadline
                                            )}
                                        </p>
                                        <p className="text-sm text-base-content">
                                            {data.taskDescription}
                                        </p>
                                    </span>
                                </span>
                                <DeleteTaskButton
                                    taskId={data.taskId}
                                    taskDescription={data.taskDescription}
                                    dialogId={`deleteTaskModal-${data.taskId}`}
                                />
                            </div>
                        </>
                    ))
                    .slice(0, 5)}
                {everyDayTaskDB.length != 0 && (
                    <button className="btn">View more</button>
                )}
            </div>
        </>
    )
}

export default Calendar