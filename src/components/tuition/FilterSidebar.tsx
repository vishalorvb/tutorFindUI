"use client";

import { useState } from "react";
import Link from "next/link";
import type { TuitionFilters, TeachingMode } from "@/types";
import { subjects, courses, cities } from "@/data/mockTuitions";
import { colors } from "@/config/theme";

interface FilterSidebarProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
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
    <div>
      <div className="relative">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
        />
        {value && (
          <button
            onClick={() => { onClear(); setQuery(""); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {focused && query.length > 0 && (
          <ul className="absolute z-20 left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg custom-scrollbar">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onMouseDown={() => { onSelect(item); setQuery(item); setFocused(false); }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-violet-50 transition-colors ${
                      value === item ? "text-violet-700 font-semibold bg-violet-50" : "text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-[13px] text-slate-400">No results found</li>
            )}
          </ul>
        )}
      </div>
      {value && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-violet-100 text-violet-700 border border-violet-200">
            {value}
            <button onClick={() => { onClear(); setQuery(""); }} className="ml-0.5 hover:text-violet-900">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Collapsible section ───

function Section({
  title,
  active,
  defaultOpen = true,
  children,
}: {
  title: string;
  active?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 last:border-b-0 pb-3 mb-1">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2 group">
        <span className="flex items-center gap-2">
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">{title}</h4>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="pt-1 pb-1">{children}</div>}
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

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasActiveFilters = filters.subject || filters.course || filters.teachingMode;

  const content = (
    <div className="space-y-1">
      {hasActiveFilters && (
        <button
          onClick={() => onFilterChange({ subject: "", course: "", teachingMode: "" })}
          className="w-full text-xs font-semibold text-red-500 hover:text-red-600 text-right pb-2 transition-colors"
        >
          Clear all filters
        </button>
      )}

      <Section title="Subject" active={!!filters.subject}>
        <AutocompleteInput
          placeholder="Search subject..."
          items={subjects}
          value={filters.subject}
          onSelect={(s) => onFilterChange({ subject: s })}
          onClear={() => onFilterChange({ subject: "" })}
        />
      </Section>

      <Section title="Course / Class" active={!!filters.course}>
        <AutocompleteInput
          placeholder="Search course / class..."
          items={courses}
          value={filters.course}
          onSelect={(c) => onFilterChange({ course: c })}
          onClear={() => onFilterChange({ course: "" })}
        />
      </Section>

      <Section title="Teaching Mode" active={!!filters.teachingMode}>
        <div className="flex gap-2">
          {TEACHING_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onFilterChange({ teachingMode: mode.value as TeachingMode | "" })}
              className={`flex-1 py-2 rounded-lg border text-[12px] font-semibold transition-all ${
                filters.teachingMode === mode.value
                  ? "border-violet-400 bg-violet-50 text-violet-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Popular Cities" defaultOpen={false}>
        <div className="flex flex-col gap-1">
          {cities.map((c) => (
            <Link
              key={c}
              href={`/tuition?city=${encodeURIComponent(c)}`}
              className="flex items-center gap-1.5 text-[13px] font-medium py-1 px-2 rounded-md hover:bg-violet-50 transition-colors"
              style={{ color: colors.primary }}
            >
              <svg className="w-3 h-3 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
        </svg>
        Filters
        {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-violet-500" />}
      </button>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      )}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Filters</h3>
          <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto custom-scrollbar h-[calc(100%-8rem)]">{content}</div>
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-slate-100 bg-white">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Show Results
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="rounded-xl border border-slate-100 bg-white shadow-md p-5">
          <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Filters</h3>
          {content}
        </div>
      </aside>
    </>
  );
}

