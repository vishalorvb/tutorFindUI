"use client";

import { useRouter } from "next/navigation";
import type { Tuition } from "@/types";
import { getTuitionDetailSlug } from "@/lib/tuitionSlug";

function timeAgo(dateStr: string): string {
  const timestamp = new Date(dateStr).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const diff = Math.max(0, Date.now() - timestamp);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
  const router = useRouter();
  const {
    subject,
    course,
    description,
    teaching_mode,
    fee,
    locality,
    pincode,
    posted_date,
    verify,
    slug,
    photo,
    student_name,
  } = tuition;

  const isOnline = teaching_mode === "online";
  const hasPhoto = !!photo;
  const detailHref = `/tuition/${getTuitionDetailSlug(tuition)}`;

  function handleCardNavigation() {
    router.push(detailHref);
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardNavigation}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardNavigation();
        }
      }}
      className="block group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isOnline ? "border-blue-100/80 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]" : "border-amber-100/80 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]"}`}>

        {/* ── Top section: colored left accent + content ── */}
        <div className="flex">
          {/* Left color accent bar */}
          <div className={`w-1 shrink-0 ${isOnline ? "bg-linear-to-b from-blue-400 via-indigo-500 to-violet-500" : "bg-linear-to-b from-amber-400 via-orange-500 to-rose-500"}`} />

          <div className="flex-1 p-3 sm:p-4">

            {/* Row 1: Avatar + Title block */}
            <div className="flex gap-2.5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-xl overflow-hidden shadow-sm ring-2 ${isOnline ? "ring-blue-100" : "ring-amber-100"}`}>
                  {hasPhoto ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={photo} alt={subject} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                </div>
                {verify && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title + student + time */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="text-gray-800 group-hover:text-blue-600 transition-colors">
                    {subject} Tutor for {course}
                  </h6>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5 shrink-0">
                    {timeAgo(posted_date)}
                  </span>
                </div>
                {student_name && (
                  <p className="text-xs text-gray-400 mt-0.5">by {student_name}</p>
                )}
              </div>
            </div>

            {/* Row 2: Description */}
            {description && (
              <p className="mt-2 text-[12px] text-gray-500 leading-relaxed line-clamp-2">
                {description}
              </p>
            )}

            {/* Row 3: Meta chips */}
            <div className="flex flex-wrap items-center gap-1 mt-2">
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                isOnline ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOnline ? "bg-blue-500" : "bg-amber-500"}`} />
                {isOnline ? "Online" : "Offline"}
              </span>

              {(locality || pincode) && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 px-2 py-0.5 rounded-full bg-gray-50">
                  <svg className="w-3 h-3 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {[locality, pincode].filter(Boolean).join(", ")}
                </span>
              )}

              {fee != null && (
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50">
                  ₹{fee.toLocaleString("en-IN")}/mo
                </span>
              )}
            </div>

            {/* Row 4: Buttons */}
            <div className="flex gap-2 mt-3">
              <a
                href={`tel:${tuition.phone_number || ""}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-sm shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 active:scale-[0.97] transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <span className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-blue-50/50 text-blue-600 text-xs font-semibold border border-blue-100 hover:bg-blue-50 active:scale-[0.97] transition-all">
                View Details
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
