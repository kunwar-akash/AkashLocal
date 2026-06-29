export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!month) return year ?? dateStr;
  const date = new Date(parseInt(year ?? '0'), parseInt(month ?? '1') - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatDateRange(start: string, end: string | null): string {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : 'Present';
  return `${startFormatted} – ${endFormatted}`;
}

export function getDuration(start: string, end: string | null): string {
  const startDate = parsePartialDate(start);
  const endDate = end ? parsePartialDate(end) : new Date();
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo`;
}

function parsePartialDate(dateStr: string): Date {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0] ?? '0');
  const month = parts[1] ? parseInt(parts[1]) - 1 : 0;
  return new Date(year, month);
}

export function getYear(dateStr: string): number {
  return parseInt(dateStr.split('-')[0] ?? '0');
}
