import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";
import TuitionPageClient from "./TuitionPageClient";

export default async function TuitionPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; city?: string }>;
}) {
  const { keyword = "", city = "" } = await searchParams;
  const isSearchMode = keyword.length > 0;

  let tuitions: import("@/types").Tuition[] = [];
  try {
    tuitions = isSearchMode
      ? await searchTuitions(1, keyword)
      : await getLatestTuitions(1);
    if (!Array.isArray(tuitions)) tuitions = [];
  } catch {
    // tuitions already initialized as []
  }

  return (
    <TuitionPageClient
      initialTuitions={tuitions}
      keyword={keyword}
      city={city}
      isSearchMode={isSearchMode}
    />
  );
}
