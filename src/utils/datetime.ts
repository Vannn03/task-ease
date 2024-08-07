export const getISODateTime = (date: string, time: string): string => {
    const combinedDateTime = `${date}T${time}`;
    const isoString = new Date(combinedDateTime).toISOString();
    return isoString;
};

export const getTimeFromISODateTimeLocale = (iso: Date | null) => {
    return iso?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const getDateFromISODateTimeLocale = (iso: Date | null) => {
    return iso?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export const getFullDateFromISODateTimeLocale = (iso: Date | null) => {
    if (!iso) return null;
    
    const dateString = iso.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    const parts = dateString.split(' ');
    return `${parts[0]}, ${parts[1]} ${parts[2]} ${parts[3]}`;
};

// import { formatDistanceToNow, parseISO } from 'date-fns';

// export const getRelativeTime = (isoString: string): string => {
//     const date = parseISO(isoString);
//     return formatDistanceToNow(date, { addSuffix: true });
// };