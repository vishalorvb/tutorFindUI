export function buildTuitionSearchHref(query: string) {
  const trimmed = query.trim();
  return trimmed ? `/tuition?query=${encodeURIComponent(trimmed)}` : "/tuition";
}