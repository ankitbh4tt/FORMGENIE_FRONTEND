const dateFormat = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" });
const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const numberFormat = new Intl.NumberFormat();

/** "12 Jun 2026" */
export function formatDate(iso: string | number | Date): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateFormat.format(d);
}

/** "12 Jun 2026, 4:32 pm" */
export function formatDateTime(iso: string | number | Date): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateTimeFormat.format(d);
}

/** "1,208" */
export function formatNumber(n: number): string {
  return numberFormat.format(n);
}

/** "1 field", "4 fields" */
export function plural(n: number, singular: string, pluralForm = `${singular}s`): string {
  return `${formatNumber(n)} ${n === 1 ? singular : pluralForm}`;
}
