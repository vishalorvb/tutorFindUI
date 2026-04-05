"use client";

import { useState, useMemo } from "react";
import type { TuitionFilters } from "@/types";
import { mockTuitions } from "@/data/mockTuitions";
import TuitionLayout from "@/components/tuition/TuitionLayout";
import TopBar from "@/components/tuition/TopBar";
import FilterSidebar from "@/components/tuition/FilterSidebar";
import TuitionList from "@/components/tuition/TuitionList";

const defaultFilters: TuitionFilters = {
  search: "",
  location: "",
  subject: "",
  course: "",
  teachingMode: "",
  sortBy: "latest",
};

export default function TuitionPage() {
  const [filters, setFilters] = useState<TuitionFilters>(defaultFilters);

  function handleFilterChange(updates: Partial<TuitionFilters>) {
    setFilters((prev) => ({ ...prev, ...updates }));
  }

  const filtered = useMemo(() => {
    let result = [...mockTuitions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.subject.toLowerCase().includes(q) ||
          t.course.toLowerCase().includes(q) ||
          (t.description?.toLowerCase().includes(q) ?? false)
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(
        (t) =>
          (t.locality?.toLowerCase().includes(loc) ?? false) ||
          (t.pincode?.includes(loc) ?? false)
      );
    }

    if (filters.subject) {
      result = result.filter((t) => t.subject === filters.subject);
    }

    if (filters.course) {
      result = result.filter((t) => t.course === filters.course);
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
      result.sort((a, b) => (b.fee ?? 0) - (a.fee ?? 0));
    }

    return result;
  }, [filters]);

  return (
    <TuitionLayout>
      <TopBar filters={filters} onFilterChange={handleFilterChange} />
      <div className="flex flex-col lg:flex-row">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        <TuitionList tuitions={filtered} />
      </div>
    </TuitionLayout>
  );
}
