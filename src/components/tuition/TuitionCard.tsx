import Image from "next/image";
import Link from "next/link";
import type { Tuition } from "@/types";
import { colors, gradients, shadows } from "@/config/theme";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function isNew(dateStr: string): boolean {
  return Date.now() - new Date(dateStr).getTime() < 24 * 60 * 60 * 1000;
}

export default function TuitionCard({ tuition }: { tuition: Tuition }) {
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
  } = tuition;

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 sm:p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="relative w-full sm:w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <Image
            src={photo || "/images/tuition/default.svg"}
            alt={`${subject} tutor for ${course}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 112px"
          />
          {isNew(posted_date) && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white bg-emerald-500">
              NEW
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {subject} Tutor Needed for {course}
          </h3>

          {/* Location + Mode */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {(locality || pincode) && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {[locality, pincode].filter(Boolean).join(", ")}
              </span>
            )}
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                teaching_mode === "online"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {teaching_mode}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
              {description.length > 100
                ? `${description.slice(0, 100)}…`
                : description}
            </p>
          )}

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {fee != null && (
              <span className="text-sm font-bold" style={{ color: colors.primary }}>
                ₹{fee.toLocaleString("en-IN")}/mo
              </span>
            )}
            <span className="text-xs text-slate-400">{timeAgo(posted_date)}</span>
            {verify && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
        <Link
          href={`/tuition/${slug}`}
          className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold border-2 transition-colors hover:bg-slate-50"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          View Details
        </Link>
        <a
          href={`tel:${tuition.phone_number || ""}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          style={{ background: gradients.primary, boxShadow: shadows.primaryButton }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
      </div>
    </div>
  );
}
