import { format, formatDistanceToNow, parseISO } from 'date-fns';

// Helper function to check if the date is today
const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const getHumanReadableDate = (datetime: string) => {
  const date = parseISO(datetime)

  // Get time ago (e.g., "20 minutes ago")
  const timeAgo = formatDistanceToNow(date);

  // Format the date based on whether it's today or not
  const formattedDate = format(date, isToday(date) ? 'hh:mm a' : 'MMM dd, hh:mm a')
  const humanReadDate = isToday(date) ? timeAgo : formattedDate;

  return { timeAgo, formattedDate, humanReadDate }
}