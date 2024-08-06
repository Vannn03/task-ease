export const getISODateTime = (date: string, time: string): string => {
    const combinedDateTime = `${date}T${time}`;
    const isoString = new Date(combinedDateTime).toISOString();
    return isoString;
};

export const getTimeFromISODateTimeLocale = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const getDateFromISODateTimeLocale = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// import { formatDistanceToNow, parseISO } from 'date-fns';

// export const getRelativeTime = (isoString: string): string => {
//     const date = parseISO(isoString);
//     return formatDistanceToNow(date, { addSuffix: true });
// };