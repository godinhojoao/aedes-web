export function removeHoursFromTimestamp(timestamp: string, hours: number): Date {
  if (!timestamp || !hours) { return new Date(); }
  const date = new Date(timestamp);
  date.setHours(date.getHours() - hours);
  return date;
}