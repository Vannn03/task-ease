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
            <DateCalendar value={dayjs(value)} onChange={handleDateChange} />
            <div className="flex flex-col gap-4 border-t pt-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Clock className="size-6" />
                    <LiveClock />
                </div>
                {everyDayTaskDB.length == 0 ? (
                    <p className="text-center font-medium opacity-35">
                        No task to display.
                    </p>
                ) : (
                    everyDayTaskDB
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
                        .slice(0, 3)
                )}
                {everyDayTaskDB.length != 0 && (
                    <button className="btn">View more</button>
                )}
            </div>
        </>
    )
}

export default Calendar
