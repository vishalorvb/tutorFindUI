import Image from "next/image";
import type { Tuition } from "@/types";
import { colors } from "@/config/theme";

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

export default function TuitionHeader({ tuition }: { tuition: Tuition }) {
  const location = [tuition.locality, tuition.city].filter(Boolean).join(", ");

  return (
    <div className="p-6 sm:p-8">
      {/* Top row: badges */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
        >
          {tuition.teaching_mode === "online" ? (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
            </svg>
          )}
          <span className="capitalize">{tuition.teaching_mode} Tuition</span>
        </span>

        {tuition.verify && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verified
          </span>
        )}

        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[11px] font-medium border border-slate-200">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeAgo(tuition.posted_date)}
        </span>
      </div>

      {/* Main row: image + content */}
      <div className="flex gap-5">
        {/* Compact image thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-linear-to-br from-violet-100 to-indigo-100 shadow-md shadow-violet-200/50 shrink-0 ring-4 ring-white">
          <Image
            src={tuition.photo || "/images/tuition/default.svg"}
            alt={`${tuition.subject} tutor for ${tuition.course}`}
            fill
            className="object-cover"
            priority
          />
          {/* Subject initial overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-violet-600/70 to-indigo-600/70">
            <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg">
              {tuition.subject.charAt(0)}
            </span>
          </div>
        </div>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
            {tuition.subject} Tutor Needed for {tuition.course}
            {tuition.city ? ` in ${tuition.city}` : ""}
          </h1>

          {/* Info chips below title */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-100 text-xs font-semibold" style={{ color: colors.primary }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {tuition.course}
            </span>

            {tuition.fee != null && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-linear-to-r from-violet-50 to-indigo-50 border border-violet-100 text-sm font-extrabold" style={{ color: colors.primary }}>
                ₹{tuition.fee.toLocaleString("en-IN")}
                <span className="text-[10px] font-medium text-slate-400">/mo</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
