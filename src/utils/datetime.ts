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