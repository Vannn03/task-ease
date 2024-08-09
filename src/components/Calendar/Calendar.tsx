'use client'

import {
    getFullDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import { DateCalendar } from '@/libs/mui'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

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

    return (
        <>
            <DateCalendar
                value={dayjs(value)}
                onChange={handleDateChange}
                className="glass rounded-lg"
            />
            <div className="mt-4">
                {everyDayTaskDB.map((data: Task) => (
                    <>
                        <div key={data.taskId} className="p-4">
                            <p className="text-sm font-semibold">
                                {getTimeFromISODateTimeLocale(data.deadline)}
                            </p>
                            <p className="text-sm">{data.taskDescription}</p>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </>
    )
}

export default Calendar
