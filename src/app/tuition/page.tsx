"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Tuition, TuitionFilters } from "@/types";
import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";
import SearchBar from "@/components/tuition/SearchBar";
import FilterChips from "@/components/tuition/FilterChips";
import FilterSidebar from "@/components/tuition/FilterSidebar";
import TuitionList from "@/components/tuition/TuitionList";
import TopInfoBar from "@/components/tuition/TopInfoBar";

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

export default function TuitionPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600" />
      </div>
    }>
      <TuitionContent />
    </Suspense>
  );
}

function TuitionContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const city = searchParams.get("city") ?? "";
  const isSearchMode = keyword.length > 0;

  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<TuitionFilters>(defaultFilters);

  const fetchTuitions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let data: Tuition[];
      if (isSearchMode) {
        data = await searchTuitions(1, keyword);
      } else {
        data = await getLatestTuitions(1);
      }
      setTuitions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("[TuitionPage] fetch error:", err);
      setError("Something went wrong. Please try again.");
      setTuitions([]);
    } finally {
      setLoading(false);
    }
  }, [isSearchMode, keyword]);

  useEffect(() => {
    fetchTuitions();
  }, [fetchTuitions]);

  // Client-side filtering on top of API results
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

  return (
    <div className="px-2 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto">
      {/* Search Section */}
      <SearchBar />
      <FilterChips filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0">
          <div className="lg:sticky lg:top-20">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 min-w-0">
          <TopInfoBar
            count={filtered.length}
            filters={filters}
            onSortChange={(sortBy: string) => handleFilterChange({ sortBy: sortBy as "latest" | "fee-high-low" })}
            keyword={keyword}
            city={city}
            isSearchMode={isSearchMode}
          />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-medium mb-2">{error}</p>
              <button
                onClick={fetchTuitions}
                className="text-violet-600 hover:text-violet-700 font-semibold text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (
            <TuitionList tuitions={filtered} keyword={keyword} />
          )}
        </div>
      </div>
    </div>
  );
}
