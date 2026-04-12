"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Tuition, TuitionFilters } from "@/types";
import SearchBar from "@/components/tuition/SearchBar";
import FilterChips from "@/components/tuition/FilterChips";
import FilterSidebar from "@/components/tuition/FilterSidebar";
import TuitionList from "@/components/tuition/TuitionList";
import TopInfoBar from "@/components/tuition/TopInfoBar";
import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";

const defaultFilters: TuitionFilters = {
  search: "",
  location: "",
  subject: "",
  course: "",
  teachingMode: "",
  sortBy: "latest",
  feeMin: "",
  feeMax: "",
};

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
  const [filters, setFilters] = useState<TuitionFilters>(defaultFilters);
  const [tuitions, setTuitions] = useState<Tuition[]>(initialTuitions);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
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

  // Client-side filtering on top of server-fetched results
  const filtered = (() => {
    let result = [...tuitions];

    if (filters.subject) {
      result = result.filter((t) => t.subject === filters.subject);
    }
    if (filters.course) {
      result = result.filter((t) => t.course === filters.course);
    }
    if (filters.feeMin) {
      result = result.filter((t) => Number(t.fee ?? 0) >= Number(filters.feeMin));
    }
    if (filters.feeMax) {
      result = result.filter((t) => Number(t.fee ?? 0) <= Number(filters.feeMax));
    }
    if (filters.teachingMode) {
      result = result.filter((t) => t.teaching_mode === filters.teachingMode);
    }

    if (filters.sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
      );
    } else {
      result.sort((a, b) => Number(b.fee ?? 0) - Number(a.fee ?? 0));
    }

    return result;
  })();

  function handleFilterChange(updates: Partial<TuitionFilters>) {
    setFilters((prev) => ({ ...prev, ...updates }));
  }

  function mergeTuitions(existing: Tuition[], incoming: Tuition[]) {
    const byId = new Map(existing.map((tuition) => [tuition.id, tuition]));

    for (const tuition of incoming) {
      byId.set(tuition.id, tuition);
    }

    return Array.from(byId.values());
  }

  async function handleSearch(query: string) {
    const trimmed = query.trim();
    setIsSearching(true);

    try {
      const nextTuitions = trimmed
        ? await searchTuitions(1, trimmed)
        : await getLatestTuitions(1);

      setSearchKeyword(trimmed);
      setTuitions(Array.isArray(nextTuitions) ? nextTuitions : []);
      setPage(1);
      setHasMore(Array.isArray(nextTuitions) && nextTuitions.length > 0);

      startTransition(() => {
        router.replace(trimmed ? `/tuition?query=${encodeURIComponent(trimmed)}` : "/tuition");
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
      const nextBatch = searchKeyword.trim()
        ? await searchTuitions(nextPage, searchKeyword.trim())
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
      {/* Search Section */}
      <SearchBar initialQuery={searchKeyword} loading={isSearching || isPending} onSearch={handleSearch} />
      <FilterChips filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-2 lg:mt-4">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 mb-1 lg:mb-0">
          <div className="lg:sticky lg:top-20">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} tuitionCount={filtered.length} />
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 min-w-0">
          <TopInfoBar
            count={filtered.length}
            filters={filters}
            onSortChange={(sortBy: string) => handleFilterChange({ sortBy: sortBy as "latest" | "fee-high-low" })}
            keyword={searchKeyword}
            city={city}
            isSearchMode={Boolean(searchKeyword.trim())}
          />
          <TuitionList
            tuitions={filtered}
            keyword={searchKeyword}
            hasMore={hasMore}
            loadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  );
}
