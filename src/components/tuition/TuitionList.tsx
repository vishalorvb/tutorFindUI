import type { Tuition } from "@/types";
import TuitionCard from "./TuitionCard";

interface TuitionListProps {
  tuitions: Tuition[];
  keyword?: string;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
}

export default function TuitionList({
  tuitions,
  keyword,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
}: TuitionListProps) {
  if (tuitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">No tuitions found</h3>
        {keyword ? (
          <p className="text-sm text-slate-500">
            No results for &quot;{keyword}&quot;. Try a different search term.
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            No tuitions available right now. Check back later!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="grid grid-cols-1 gap-4">
        {tuitions.map((t) => (
          <TuitionCard key={t.id} tuition={t} />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-5">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center justify-center gap-2 min-w-40 px-5 py-2.5 rounded-xl bg-white border border-violet-200 text-sm font-semibold text-violet-700 hover:bg-violet-50 hover:border-violet-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loadingMore ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                Load More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
