"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Tuition } from "@/types";
import SearchBar from "@/components/tuition/SearchBar";
import TuitionList from "@/components/tuition/TuitionList";
import TopInfoBar from "@/components/tuition/TopInfoBar";
import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";

interface TuitionPageClientProps {
  initialTuitions: Tuition[];
  keyword: string;
  city: string;
  isSearchMode: boolean;
}

export default function TuitionPageClient({
  initialTuitions,
  keyword,
  city,
}: TuitionPageClientProps) {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<Tuition[]>(initialTuitions);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchLocation, setSearchLocation] = useState(city);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialTuitions.length > 0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTuitions(initialTuitions);
    setPage(1);
    setHasMore(initialTuitions.length > 0);
  }, [initialTuitions]);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  function mergeTuitions(existing: Tuition[], incoming: Tuition[]) {
    const byId = new Map(existing.map((tuition) => [tuition.id, tuition]));

    for (const tuition of incoming) {
      byId.set(tuition.id, tuition);
    }

    return Array.from(byId.values());
  }

  async function handleSearch(query: string, location: string) {
    const combined = [query, location].filter(Boolean).join(" ");
    setIsSearching(true);

    try {
      const nextTuitions = combined
        ? await searchTuitions(1, combined)
        : await getLatestTuitions(1);

      setSearchKeyword(query);
      setSearchLocation(location);
      setTuitions(Array.isArray(nextTuitions) ? nextTuitions : []);
      setPage(1);
      setHasMore(Array.isArray(nextTuitions) && nextTuitions.length > 0);

      const params = new URLSearchParams();
      if (query) params.set("query", query);
      if (location) params.set("location", location);
      const qs = params.toString();

      startTransition(() => {
        router.replace(qs ? `/tuition?${qs}` : "/tuition");
      });
    } finally {
      setIsSearching(false);
    }
  }

  async function handleLoadMore() {
    if (isLoadingMore || !hasMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    try {
      const combined = [searchKeyword, searchLocation].filter(Boolean).join(" ").trim();
      const nextBatch = combined
        ? await searchTuitions(nextPage, combined)
        : await getLatestTuitions(nextPage);

      const nextItems = Array.isArray(nextBatch) ? nextBatch : [];

      if (nextItems.length === 0) {
        setHasMore(false);
        return;
      }

      setTuitions((prev) => mergeTuitions(prev, nextItems));
      setPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <div className="px-2 sm:px-6 py-3 sm:py-6 max-w-7xl mx-auto">
      <SearchBar initialQuery={searchKeyword} initialLocation={searchLocation} loading={isSearching || isPending} onSearch={handleSearch} />

      <div className="mt-2 lg:mt-4">
        <TopInfoBar
          count={tuitions.length}
          keyword={searchKeyword}
          city={searchLocation}
          isSearchMode={Boolean(searchKeyword.trim() || searchLocation.trim())}
        />
        <TuitionList
          tuitions={tuitions}
          keyword={searchKeyword}
          hasMore={hasMore}
          loadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}
