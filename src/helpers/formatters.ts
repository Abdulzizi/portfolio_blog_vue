export function safeParse(jsonString: string | null | undefined): any[] {
  try {
    return JSON.parse(jsonString || "[]");
  } catch {
    return [];
  }
}

export function formatPeriod(
  startDate: string | null,
  endDate: string | null
): string {
  if (!startDate) return "—";

  const format = (date: string) =>
    new Date(date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

  if (!endDate || startDate === endDate) return format(startDate);

  return `${format(startDate)} – ${format(endDate)}`;
}
