import Link from "next/link";
import type { Tuition } from "@/types";
import { colors } from "@/config/theme";

export default function TuitionDescription({ tuition }: { tuition: Tuition }) {
  const city = tuition.city || tuition.locality || "your city";

  return (
    <div className="pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-100">
          <svg className="w-4 h-4" fill="none" stroke={colors.primary} viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        <h2 className="text-base font-bold text-slate-900">Requirement Details</h2>
      </div>

      {tuition.description && (
        <p className="text-sm text-slate-600 leading-relaxed pl-[2.625rem]">{tuition.description}</p>
      )}

      {/* SEO paragraph */}
      <div className="mt-5 pl-[2.625rem] pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-500 leading-relaxed">
          If you are looking for{" "}
          <Link href={`/tuition?subject=${encodeURIComponent(tuition.subject)}`} className="font-semibold hover:underline underline-offset-2" style={{ color: colors.primary }}>
            {tuition.subject} tuition jobs in {city}
          </Link>{" "}
          for {tuition.course}, this is a great opportunity for experienced tutors. Many students are actively searching for qualified{" "}
          <Link href={`/tuition?location=${encodeURIComponent(city)}`} className="font-semibold hover:underline underline-offset-2" style={{ color: colors.primary }}>
            tutors in {city}
          </Link>
          .
        </p>

        {/* Internal links */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/tuition?subject=${encodeURIComponent(tuition.subject)}&location=${encodeURIComponent(city)}`}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 hover:border-violet-200 hover:shadow-sm transition-all"
            style={{ color: colors.primary }}
          >
            {tuition.subject} tutors in {city} →
          </Link>
          <Link
            href={`/tuition?mode=home&location=${encodeURIComponent(city)}`}
            className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 hover:border-violet-200 hover:shadow-sm transition-all"
            style={{ color: colors.primary }}
          >
            Home tuition in {city} →
          </Link>
        </div>
      </div>
    </div>
  );
}
