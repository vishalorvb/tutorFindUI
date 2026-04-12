"use client";

import type { TuitionFilters } from "@/types";

interface TopBarProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
}

export default function TopBar({ filters, onFilterChange }: TopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
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
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all"
        />
      </div>

      <div className="relative flex-1 sm:max-w-45">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rose-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Location..."
          value={filters.location}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all"
        />
      </div>

      <div className="relative shrink-0">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l2 9 4-18 4 18 2-9h4" />
        </svg>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ sortBy: e.target.value as TuitionFilters["sortBy"] })
          }
          className="pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-300 transition-all cursor-pointer appearance-none"
        >
          <option value="latest">Latest</option>
          <option value="fee-high-low">Budget High→Low</option>
        </select>
      </div>
    </div>
  );
}
