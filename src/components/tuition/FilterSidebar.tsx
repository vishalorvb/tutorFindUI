"use client";

import { useState } from "react";
import Link from "next/link";
import type { TuitionFilters, TeachingMode } from "@/types";
import { subjects, courses, cities } from "@/data/mockTuitions";

interface FilterSidebarProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
  tuitionCount?: number;
}

// ─── Reusable autocomplete input ───

function AutocompleteInput({
  placeholder,
  items,
  value,
  onSelect,
  onClear,
}: {
  placeholder: string;
  items: string[];
  value: string;
  onSelect: (item: string) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query
    ? items.filter((i) => i.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="w-full pl-8 pr-8 py-2 rounded-xl bg-slate-50 border-none text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white transition-all"
        />
        {value && (
          <button
            onClick={() => { onClear(); setQuery(""); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-2.5 h-2.5 text-slate-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {focused && query.length > 0 && (
          <ul className="absolute z-20 left-0 right-0 mt-1.5 max-h-40 overflow-y-auto rounded-xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 custom-scrollbar">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onMouseDown={() => { onSelect(item); setQuery(item); setFocused(false); }}
                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      value === item
                        ? "text-violet-700 font-semibold bg-violet-50"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2.5 text-[13px] text-slate-400 text-center">No results</li>
            )}
          </ul>
        )}
      </div>
      {value && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-50 border border-violet-100">
          <svg className="w-3 h-3 text-violet-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
          <span className="text-[12px] font-semibold text-violet-700 truncate">{value}</span>
          <button onClick={() => { onClear(); setQuery(""); }} className="ml-auto shrink-0 text-violet-300 hover:text-red-500 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Collapsible section ───

function Section({
  title,
  icon,
  active,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-3 border-b border-slate-100/80 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full group">
        <span className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-violet-100 text-violet-600" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"}`}>
            {icon}
          </span>
          <span className="text-[13px] font-semibold text-slate-700">{title}</span>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />}
        </span>
        <svg
          className={`w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-all duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 opacity-100 mt-2.5" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
}

// ─── Teaching mode options ───

const TEACHING_MODES = [
  { value: "", label: "All" },
  { value: "online", label: "Online" },
  { value: "home", label: "Home" },
] as const;

// ─── Main component ───

export default function FilterSidebar({ filters, onFilterChange, tuitionCount }: FilterSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasActiveFilters = filters.subject || filters.course || filters.teachingMode;
  const activeCount = [filters.subject, filters.course, filters.teachingMode].filter(Boolean).length;

  const content = (
    <div>
      {/* Sort */}
      <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-100/80">
        <span className="text-[11px] font-semibold text-slate-500">Sort by</span>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as TuitionFilters["sortBy"] })}
            className="pl-2 pr-5 py-1 rounded-lg text-[11px] font-semibold text-violet-700 bg-violet-50 border-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer appearance-none"
          >
            <option value="latest">Latest</option>
            <option value="fee-high-low">Budget High→Low</option>
          </select>
          <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-violet-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      {hasActiveFilters && (
        <button
          onClick={() => onFilterChange({ subject: "", course: "", teachingMode: "" })}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-red-400 hover:text-red-600 mb-1 px-1 py-1 rounded-lg hover:bg-red-50 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83a1.125 1.125 0 0 1 .795-.33H19.5a1.125 1.125 0 0 1 1.125 1.125v10.5a1.125 1.125 0 0 1-1.125 1.125h-9.284c-.298 0-.585-.119-.795-.33Z" />
          </svg>
          Reset all filters
        </button>
      )}

      <Section
        title="Subject"
        active={!!filters.subject}
        icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
      >
        <AutocompleteInput
          placeholder="Search subject..."
          items={subjects}
          value={filters.subject}
          onSelect={(s) => onFilterChange({ subject: s })}
          onClear={() => onFilterChange({ subject: "" })}
        />
      </Section>

      <Section
        title="Course / Class"
        active={!!filters.course}
        icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>}
      >
        <AutocompleteInput
          placeholder="Search course / class..."
          items={courses}
          value={filters.course}
          onSelect={(c) => onFilterChange({ course: c })}
          onClear={() => onFilterChange({ course: "" })}
        />
      </Section>

      <Section
        title="Teaching Mode"
        active={!!filters.teachingMode}
        icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25Z" /></svg>}
      >
        <div className="flex items-center bg-slate-100/80 rounded-full p-0.5">
          {[
            { value: "", label: "Both", icon: <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
            { value: "online", label: "Online", icon: <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25Z" /></svg> },
            { value: "home", label: "Home", icon: <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> },
          ].map((mode) => (
            <button
              key={mode.value}
              onClick={() => onFilterChange({ teachingMode: mode.value as TeachingMode | "" })}
              className={`flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                filters.teachingMode === mode.value
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Popular Cities"
        defaultOpen={true}
        icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
      >
        <div className="flex flex-wrap gap-1.5">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/tuition/${encodeURIComponent(c)}`}
              className="inline-flex items-center gap-1 text-[11px] font-medium py-1.5 px-2.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700 border border-transparent hover:border-violet-200 transition-all"
            >
              <svg className="w-2.5 h-2.5 text-violet-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {c}
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden flex items-center gap-2 mb-1">
        <button
          onClick={() => setDrawerOpen(true)}
          className="relative w-8 h-8 rounded-lg bg-white border border-violet-200 flex items-center justify-center text-violet-600 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
          </svg>
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-violet-600 text-white text-[7px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {tuitionCount !== undefined && (
          <span className="text-[11px] font-semibold text-slate-500">
            {tuitionCount} <span className="text-slate-400 font-normal">tuitions available</span>
          </span>
        )}
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Filters</h3>
              {hasActiveFilters && (
                <p className="text-[10px] text-slate-400">{activeCount} active</p>
              )}
            </div>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto custom-scrollbar h-[calc(100%-8rem)]">{content}</div>
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full py-3 rounded-xl text-[13px] font-bold text-white transition-all active:scale-[0.97] shadow-lg shadow-violet-500/25"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
          >
            Show Results
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm shadow-slate-100/50 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3.5 bg-linear-to-r from-violet-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span className="text-[13px] font-bold text-white">Filters</span>
              </div>
              {hasActiveFilters && (
                <span className="text-[10px] font-semibold text-violet-200 bg-white/15 px-2 py-0.5 rounded-full">
                  {activeCount} active
                </span>
              )}
            </div>
          </div>
          {/* Content */}
          <div className="p-4">
            {content}
          </div>
        </div>
      </aside>
    </>
  );
}

