import type { Tuition } from "@/types";
import TuitionCard from "./TuitionCard";

interface TuitionListProps {
  tuitions: Tuition[];
  keyword?: string;
}

export default function TuitionList({ tuitions, keyword }: TuitionListProps) {
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
      <p className="hidden lg:block text-sm font-semibold text-slate-500 mb-2">
        <span className="text-slate-900 font-bold">{tuitions.length}</span> Tuitions Available
      </p>
      <div className="grid grid-cols-1 gap-4">
        {tuitions.map((t) => (
          <TuitionCard key={t.id} tuition={t} />
        ))}
      </div>
    </div>
  );
}
