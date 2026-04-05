"use client";

import type { TuitionFilters } from "@/types";
import { colors } from "@/config/theme";

interface TopBarProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
}

export default function TopBar({ filters, onFilterChange }: TopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by subject..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
        />
      </div>

      <div className="relative flex-1 sm:max-w-[220px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Location..."
          value={filters.location}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
        />
      </div>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          onFilterChange({ sortBy: e.target.value as TuitionFilters["sortBy"] })
        }
        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all cursor-pointer"
        style={{ accentColor: colors.primary }}
      >
        <option value="latest">Latest</option>
        <option value="fee-high-low">Budget High→Low</option>
      </select>
    </div>
  );
}
