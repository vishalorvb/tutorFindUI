import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";
import TuitionPageClient from "./TuitionPageClient";

export default async function TuitionPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; keyword?: string; city?: string }>;
}) {
  const { query = "", keyword = "", city = "" } = await searchParams;
  const searchQuery = (query || keyword).trim();
  const isSearchMode = searchQuery.length > 0;

  let tuitions: import("@/types").Tuition[] = [];
  try {
    tuitions = isSearchMode
      ? await searchTuitions(1, searchQuery)
      : await getLatestTuitions(1);
    if (!Array.isArray(tuitions)) tuitions = [];
  } catch {
    // tuitions already initialized as []
  }

  return (
    <TuitionPageClient
      initialTuitions={tuitions}
      keyword={searchQuery}
      city={city}
    />
  );
}
