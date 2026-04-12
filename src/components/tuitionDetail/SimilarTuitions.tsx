import Link from "next/link";
import type { Tuition } from "@/types";
import { colors } from "@/config/theme";
import { getTuitionDetailSlug } from "@/lib/tuitionSlug";

function timeAgo(dateStr: string): string {
  const timestamp = new Date(dateStr).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const diff = Math.max(0, Date.now() - timestamp);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function SimilarTuitions({
  tuitions,
}: {
  tuitions: Tuition[];
}) {
  if (tuitions.length === 0) return null;

  return (
    <div className="mt-5 bg-white rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-100 p-6 sm:p-8">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100">
          <svg className="w-4 h-4" fill="none" stroke={colors.secondary} viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </span>
        <h2 className="text-base font-bold text-slate-900">Similar Tuitions</h2>
      </div>

      <div className="grid gap-3">
        {tuitions.map((t) => (
          <Link
            key={t.id}
            href={`/tuition/${getTuitionDetailSlug(t)}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-linear-to-r hover:from-violet-50/50 hover:to-indigo-50/30 transition-all duration-200 group"
          >
            {/* Subject initial avatar */}
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl text-sm font-extrabold text-white shrink-0 shadow-md"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              {t.subject.charAt(0)}
            </span>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors truncate">
                {t.subject} — {t.course}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                {(t.locality || t.city) && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {[t.locality, t.city].filter(Boolean).join(", ")}
                  </span>
                )}
                <span className="capitalize">{t.teaching_mode}</span>
                <span>{timeAgo(t.posted_date)}</span>
              </div>
            </div>

            {t.fee != null && (
              <span className="text-sm font-extrabold shrink-0" style={{ color: colors.primary }}>
                ₹{t.fee.toLocaleString("en-IN")}
              </span>
            )}

            <svg className="w-4 h-4 text-slate-300 group-hover:text-violet-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
