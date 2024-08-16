import dayjs from 'dayjs'

export const getISODateTime = (date: string, time: string): string => {
    const combinedDateTime = `${date}T${time}`
    const isoString = dayjs(combinedDateTime).toISOString()
    return isoString
}

export const getISODateTimeLocale = (iso: Date | null, format: string) => {
    if (!iso) return null
    return dayjs(iso).format(format)
}

export const getDeadlineColor = (dateNow: Date, deadline: Date) => {
    const now = dayjs(dateNow)
    const taskTime = dayjs(deadline)
    const diffInMinutes = taskTime.diff(now, 'minute')

    if (diffInMinutes < 0) {
        return 'border-error text-error'
    } else if (diffInMinutes <= 60) {
        return 'border-warning text-warning'
    } else {
        return 'border-info text-info'
    }
}
