"use client";

import { useState } from "react";
import type { Tuition, TuitionFilters } from "@/types";
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
  isSearchMode,
}: TuitionPageClientProps) {
  const [filters, setFilters] = useState<TuitionFilters>(defaultFilters);

  // Client-side filtering on top of server-fetched results
  const filtered = (() => {
    let result = [...initialTuitions];

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
    <div className="px-2 sm:px-6 py-3 sm:py-6 max-w-7xl mx-auto">
      {/* Search Section */}
      <SearchBar />
      <FilterChips filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 mt-2 lg:mt-4">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 mb-1 lg:mb-0">
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
            keyword={keyword}
            city={city}
            isSearchMode={isSearchMode}
          />
          <TuitionList tuitions={filtered} keyword={keyword} />
        </div>
      </div>
    </div>
  );
}
