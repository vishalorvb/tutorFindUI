"use client";

import { useState } from "react";
import Link from "next/link";
import type { TuitionFilters, TeachingMode } from "@/types";
import { subjects, courses, popularCities } from "@/data/mockTuitions";
import { colors } from "@/config/theme";

interface FilterSidebarProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    subject: true,
    course: true,
    mode: true,
    location: true,
    cities: true,
  });

  function toggleSection(key: string) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const hasActiveFilters =
    filters.subject || filters.course || filters.teachingMode || filters.location;

  const content = (
    <div className="space-y-1">
      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={() =>
            onFilterChange({ subject: "", course: "", teachingMode: "", location: "" })
          }
          className="w-full text-xs font-semibold text-red-500 hover:text-red-600 text-right pb-2 transition-colors"
        >
          Clear all filters
        </button>
      )}

      {/* Subject */}
      <FilterSection
        title="Subject"
        expanded={expandedSections.subject}
        onToggle={() => toggleSection("subject")}
        active={!!filters.subject}
      >
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
          <label className="filter-option">
            <input
              type="radio"
              name="subject"
              checked={!filters.subject}
              onChange={() => onFilterChange({ subject: "" })}
              className="accent-violet-600 shrink-0"
            />
            <span>All Subjects</span>
          </label>
          {subjects.map((s) => (
            <label key={s} className="filter-option">
              <input
                type="radio"
                name="subject"
                checked={filters.subject === s}
                onChange={() => onFilterChange({ subject: s })}
                className="accent-violet-600 shrink-0"
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Course */}
      <FilterSection
        title="Course / Class"
        expanded={expandedSections.course}
        onToggle={() => toggleSection("course")}
        active={!!filters.course}
      >
        <div className="flex flex-wrap gap-1.5">
          <ChipButton
            label="All"
            active={!filters.course}
            onClick={() => onFilterChange({ course: "" })}
          />
          {courses.map((c) => (
            <ChipButton
              key={c}
              label={c}
              active={filters.course === c}
              onClick={() => onFilterChange({ course: c })}
            />
          ))}
        </div>
      </FilterSection>

      {/* Teaching Mode */}
      <FilterSection
        title="Teaching Mode"
        expanded={expandedSections.mode}
        onToggle={() => toggleSection("mode")}
        active={!!filters.teachingMode}
      >
        <div className="flex gap-2">
          {(
            [
              { value: "", label: "All", icon: "M4 6h16M4 12h16M4 18h16" },
              { value: "online", label: "Online", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { value: "home", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" },
            ] as const
          ).map((mode) => (
            <button
              key={mode.value}
              onClick={() => onFilterChange({ teachingMode: mode.value as TeachingMode | "" })}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                filters.teachingMode === mode.value
                  ? "border-violet-400 bg-violet-50 text-violet-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={mode.icon} />
              </svg>
              {mode.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection
        title="Location"
        expanded={expandedSections.location}
        onToggle={() => toggleSection("location")}
        active={!!filters.location}
      >
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search locality..."
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
          />
        </div>
      </FilterSection>

      {/* Popular Cities (SEO) */}
      <FilterSection
        title="Popular Cities"
        expanded={expandedSections.cities}
        onToggle={() => toggleSection("cities")}
      >
        <div className="flex flex-col gap-1">
          {popularCities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="flex items-center gap-1.5 text-xs font-medium py-1 px-2 rounded-md hover:bg-violet-50 transition-colors"
              style={{ color: colors.primary }}
            >
              <svg className="w-3 h-3 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {city.label}
            </Link>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-violet-500" />
        )}
      </button>

      {/* Mobile drawer backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Filters</h3>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="px-5 py-4 overflow-y-auto custom-scrollbar h-[calc(100%-8rem)]">
          {content}
        </div>

        {/* Drawer footer */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-slate-100 bg-white">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Show Results
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 mr-8">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar rounded-xl border border-slate-100 bg-white shadow-md">
          <div className="p-5">
            <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
              Filters
            </h3>
            {content}
          </div>
        </div>
      </aside>
    </>
  );
}

function FilterSection({
  title,
  expanded,
  onToggle,
  active,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 last:border-b-0 pb-3 mb-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2.5 group"
      >
        <span className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            {title}
          </h4>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
        </span>
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ${
            expanded
              ? "bg-violet-100 text-violet-600"
              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {expanded && <div className="pt-1 pb-1">{children}</div>}
    </div>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
        active
          ? "border-violet-400 bg-violet-50 text-violet-700"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

