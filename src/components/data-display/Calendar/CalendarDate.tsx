import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect, useCallback } from 'react'
import { DateCalendar } from '@/libs/mui'
import {
    DayCalendarSkeleton,
    PickersDay,
    PickersDayProps,
} from '@mui/x-date-pickers'
import { Badge } from '@mui/material'
import { getISODateTimeLocale } from '@/utils/datetime'

interface ServerDayProps extends PickersDayProps<Dayjs> {
    highlightedDays: number[]
}

const ServerDay: React.FC<ServerDayProps> = (props) => {
    const { day, highlightedDays, outsideCurrentMonth, ...other } = props
    // Determine if the day should be highlighted
    const isTaskDay = highlightedDays.includes(day.date())

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={!isTaskDay && null}
            color="warning"
        >
            <PickersDay
                {...other}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
            />
        </Badge>
    )
}

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

interface CalendarDateProps {
    selectedDate: Dayjs
    setSelectedDate: (selectedDate: string | null) => void
    nearestTaskDB: Task[]
}

const CalendarDate = ({
    selectedDate,
    setSelectedDate,
    nearestTaskDB,
}: CalendarDateProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [highlightedDays, setHighlightedDays] = useState<number[]>([])
    const [currentMonth, setCurrentMonth] = useState(dayjs(selectedDate))

    // Effect to handle month changes and update highlighted days
    const handleMonthChange = useCallback(
        (date: Dayjs) => {
            setIsLoading(true)
            // Get the days of the month that have tasks
            const daysWithTasks = nearestTaskDB
                .filter((task) => dayjs(task.deadline).isSame(date, 'month'))
                .map((task) => dayjs(task.deadline).date())

            setHighlightedDays(daysWithTasks) // Update highlighted days

            // Callback to update selectedDate
            const updateSelectedDate = () => setSelectedDate(date.toString())

            setIsLoading(false)
            updateSelectedDate()
        },
        [nearestTaskDB, setSelectedDate]
    )

    // Effect to run handleMonthChange on currentMonth change
    useEffect(() => {
        handleMonthChange(currentMonth)
    }, [currentMonth, handleMonthChange])

    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            setSelectedDate(
                getISODateTimeLocale(newValue.toDate(), 'dddd, D MMMM YYYY')
            )
        }
    }

    return (
        <DateCalendar
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            className="w-fit rounded-lg bg-base-100"
            onMonthChange={handleMonthChange}
            loading={isLoading}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
                day: (dayProps) => (
                    <ServerDay
                        {...dayProps}
                        highlightedDays={highlightedDays}
                    />
                ),
            }}
        />
    )
}

export default CalendarDate
