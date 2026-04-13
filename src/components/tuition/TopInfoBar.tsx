import Link from "next/link";

interface TopInfoBarProps {
  count: number;
  keyword?: string;
  city?: string;
  isSearchMode?: boolean;
}

export default function TopInfoBar({ count, keyword, city, isSearchMode }: TopInfoBarProps) {
  if (!isSearchMode) return null;

  const searchLabel = `Showing results for "${keyword}${city ? ` in ${city}` : ""}"`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="text-[12px] text-gray-500 truncate">{searchLabel}</p>
          <span className="shrink-0 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
            {count}
          </span>
        </div>
        <Link
          href="/tuition"
          className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </Link>
      </div>
    </div>
  );
}
