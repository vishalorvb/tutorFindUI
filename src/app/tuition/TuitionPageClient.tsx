"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Tuition } from "@/types";
import SearchBar from "@/components/tuition/SearchBar";
import TuitionList from "@/components/tuition/TuitionList";
import FilterSidebar from "@/components/tuition/FilterSidebar";
import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";
import { useLoader } from "@/components/loader/LoaderContext";

interface TuitionPageClientProps {
  initialTuitions: Tuition[];
  keyword: string;
  city: string;
}

export default function TuitionPageClient({
  initialTuitions,
  keyword,
  city,
}: TuitionPageClientProps) {
  const router = useRouter();
  const { loader, setLoader } = useLoader();
  const [tuitions, setTuitions] = useState<Tuition[]>(initialTuitions);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchLocation, setSearchLocation] = useState(city);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialTuitions.length > 0);
  const [isPending, startTransition] = useTransition();
  const [teachingModeFilter, setTeachingModeFilter] = useState("");
  const [feeRangeFilter, setFeeRangeFilter] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const filteredTuitions = useMemo(() => {
    let result = tuitions;

    if (teachingModeFilter) {
      result = result.filter((t) => t.teaching_mode === teachingModeFilter);
    }

    if (feeRangeFilter) {
      const [minStr, maxStr] = feeRangeFilter.split("-");
      const min = Number(minStr) || 0;
      const max = maxStr ? Number(maxStr) : Infinity;
      result = result.filter((t) => {
        const fee = Number(t.fee) || 0;
        return fee >= min && fee <= max;
      });
    }

    return result;
  }, [tuitions, teachingModeFilter, feeRangeFilter]);

  async function handleSearch(query: string, location: string) {
    const combined = [query, location].filter(Boolean).join(" ");
    setLoader(true);

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
      setLoader(false);
    }
  }

  const handleCityClick = useCallback(
    (c: string) => {
      setShowMobileFilters(false);
      handleSearch(searchKeyword, c);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchKeyword],
  );

  const handleFilterChange = useCallback(
    (filters: { teachingMode: string; feeRange: string }) => {
      setTeachingModeFilter(filters.teachingMode);
      setFeeRangeFilter(filters.feeRange);
    },
    [],
  );

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
      <SearchBar initialQuery={searchKeyword} initialLocation={searchLocation} loading={loader || isPending} onSearch={handleSearch} />

      <div className="mt-2 lg:mt-4">

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50 text-violet-600 border border-violet-200 transition-colors hover:bg-violet-100"
            aria-label="Toggle filters"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {(teachingModeFilter || feeRangeFilter) && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-violet-500 ring-1 ring-white" />
            )}
          </button>
        </div>

        {/* Mobile filter overlay */}
        {showMobileFilters && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-white shadow-xl overflow-y-auto custom-scrollbar animate-slide-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-linear-to-r from-violet-50 to-indigo-50">
                <span className="text-xs font-semibold text-gray-800">Filters</span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <FilterSidebar
                  onCityClick={handleCityClick}
                  onFilterChange={handleFilterChange}
                  activeCity={searchLocation}
                  activeTeachingMode={teachingModeFilter}
                  activeFeeRange={feeRangeFilter}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex gap-6">
          {/* Sidebar – desktop only */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                onCityClick={handleCityClick}
                onFilterChange={handleFilterChange}
                activeCity={searchLocation}
                activeTeachingMode={teachingModeFilter}
                activeFeeRange={feeRangeFilter}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <TuitionList
              tuitions={filteredTuitions}
              keyword={searchKeyword}
              hasMore={hasMore}
              loadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
