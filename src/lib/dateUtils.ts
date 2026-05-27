export function isOverdue(dateStr: string): boolean {
  // Parse the date string (format: 'May 27, 2026') and compare to today
  const date = new Date(dateStr);
  const today = new Date();
  // Zero out time portions for date-only comparison
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  // Return true if the date is strictly before today
  return date.getTime() < today.getTime();
}

export function isToday(dateStr: string): boolean {
  // Return true if the date matches today's date
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getDueUrgency(dateStr: string): 'overdue' | 'today' | 'upcoming' {
  if (isOverdue(dateStr)) return 'overdue';
  if (isToday(dateStr)) return 'today';
  return 'upcoming';
}
