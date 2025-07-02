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

  if (!endDate) return `${format(startDate)} – present`;

  if (startDate === endDate) return format(startDate);

  return `${format(startDate)} – ${format(endDate)}`;
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
