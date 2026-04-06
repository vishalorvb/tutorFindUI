import type { Teacher } from "@/types";
import TeacherCard from "./TeacherCard";

interface TeacherListProps {
  teachers: Teacher[];
  keyword?: string;
}

export function TeacherCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 sm:p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export default function TeacherList({ teachers, keyword }: TeacherListProps) {
  if (teachers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">No teachers found</h3>
        {keyword ? (
          <p className="text-sm text-slate-500">
            No results for &quot;{keyword}&quot;. Try a different search term.
          </p>
        ) : (
          <p className="text-sm text-slate-500">No teachers available right now. Check back later!</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {teachers.map((t) => (
        <TeacherCard key={t.id} teacher={t} />
      ))}
    </div>
  );
}
