import Link from "next/link";
import type { TuitionFilters } from "@/types";

interface TopInfoBarProps {
  count: number;
  filters: TuitionFilters;
  onSortChange: (sort: string) => void;
  keyword?: string;
  city?: string;
  isSearchMode?: boolean;
}

export default function TopInfoBar({ count, filters, onSortChange, keyword, city, isSearchMode }: TopInfoBarProps) {
  const searchLabel = isSearchMode
    ? `Showing results for "${keyword}${city ? ` in ${city}` : ""}"`
    : "Latest Tuitions";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
      <div className="flex items-center gap-3">
        <div className="text-base font-semibold text-slate-700">
          {isSearchMode ? (
            <>
              <span className="text-slate-500 text-sm">{searchLabel}</span>
              <span className="ml-2 text-slate-400 text-sm">({count})</span>
            </>
          ) : (
            <>
              {searchLabel}
              <span className="ml-2 text-slate-400 text-sm">({count})</span>
            </>
          )}
        </div>
        {isSearchMode && (
          <Link
            href="/tuition"
            className="text-xs font-semibold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1 rounded-full transition-colors"
          >
            Clear Search
          </Link>
        )}
      </div>
      <select
        value={filters.sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all cursor-pointer"
      >
        <option value="latest">Latest</option>
        <option value="fee-high-low">Budget High→Low</option>
      </select>
    </div>
  );
}
