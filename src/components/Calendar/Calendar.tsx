'use client'

import {
    getFullDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import LiveClock from '../LiveClock/LiveClock'

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
        const now = dayjs()
        const taskTime = dayjs(deadline)
        const diffInMinutes = taskTime.diff(now, 'minute')

        if (diffInMinutes < 0) {
            return 'border-error text-error' // Deadline has passed
        } else if (diffInMinutes <= 60) {
            return 'border-warning text-warning' // Deadline is near (within the next hour)
        } else {
            return 'border-info text-info' // Default color
        }
    }

    return (
        <>
            <DateCalendar
                value={dayjs(value)}
                onChange={handleDateChange}
                className="rounded-lg bg-base-200"
            />
            <div className="mt-4 flex flex-col gap-4">
                <p>
                    Current time: <LiveClock />
                </p>
                {everyDayTaskDB.map((data: Task) => (
                    <>
                        <div
                            key={data.taskId}
                            className={`flex gap-2 rounded-lg border p-4 ${getDeadlineColor(
                                data.deadline
                            )}`}
                        >
                            <Clock className="mt-[2px] size-4" />
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
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Calendar
