export function getMidnightUtc(date: Date): number {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}