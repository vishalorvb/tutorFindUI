import Image from "next/image";
import Link from "next/link";
import type { Teacher } from "@/types";

const modeConfig: Record<string, { chip: string; dot: string; accent: string; border: string; shadow: string; ring: string }> = {
  online: {
    chip: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
    accent: "bg-linear-to-b from-blue-400 via-indigo-500 to-violet-500",
    border: "border-blue-100/80",
    shadow: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
    ring: "ring-blue-100",
  },
  offline: {
    chip: "bg-amber-50 text-amber-600",
    dot: "bg-amber-500",
    accent: "bg-linear-to-b from-amber-400 via-orange-500 to-rose-500",
    border: "border-amber-100/80",
    shadow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]",
    ring: "ring-amber-100",
  },
  both: {
    chip: "bg-violet-50 text-violet-600",
    dot: "bg-violet-500",
    accent: "bg-linear-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    border: "border-violet-100/80",
    shadow: "hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]",
    ring: "ring-violet-100",
  },
};

const fallback = modeConfig.online;

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const {
    name,
    subject,
    experience,
    qualification,
    teaching_mode,
    location,
    pincode,
    fee,
    about,
    photo,
    slug,
  } = teacher;

  const aboutTruncated = about?.length > 80 ? `${about.slice(0, 80)}…` : about;
  const modeLabel =
    teaching_mode === "both"
      ? "Online & Offline"
      : teaching_mode.charAt(0).toUpperCase() + teaching_mode.slice(1);

  const mode = modeConfig[teaching_mode] ?? fallback;

  return (
    <Link href={`/teachers/${slug}-${teacher.id}`} className="block group">
      <div className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${mode.border} ${mode.shadow}`}>
        <div className="flex">
          {/* Left accent bar */}
          <div className={`w-1 shrink-0 ${mode.accent}`} />

          <div className="flex-1 p-2.5 sm:p-3.5">

            {/* Row 1: Avatar + Name + Mode */}
            <div className="flex gap-2">
              {/* Avatar */}
              <div className="shrink-0">
                <div className={`w-10 h-10 rounded-lg overflow-hidden shadow-sm ring-2 ${mode.ring}`}>
                  <Image
                    src={photo || "/images/teacher/default.svg"}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name + Subject + Qualification */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="text-gray-800 group-hover:text-blue-600 transition-colors">
                    {name}
                  </h6>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${mode.chip}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${mode.dot}`} />
                    {modeLabel}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-xs text-violet-600 font-medium mt-0.5 truncate">
                  <svg className="w-3 h-3 text-violet-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  {subject}
                  <span className="text-gray-300 mx-0.5">·</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] text-teal-500 font-semibold">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h10.5m-10.5 0L12 9l5.25 2.25" />
                    </svg>
                    {qualification}
                  </span>
                </p>
              </div>
            </div>

            {/* Row 2: About */}
            {aboutTruncated && (
              <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed line-clamp-1">
                {aboutTruncated}
              </p>
            )}

            {/* Row 3: Meta chips */}
            <div className="flex flex-wrap items-center gap-1 mt-1.5">
              {(location || pincode) && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 px-2 py-0.5 rounded-full bg-gray-50">
                  <svg className="w-3 h-3 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {[location, pincode].filter(Boolean).join(", ")}
                </span>
              )}

              <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 px-2 py-0.5 rounded-full bg-gray-50">
                <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {experience} experience
              </span>

              {fee && (
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50">
                  ₹{fee}/mo
                </span>
              )}
            </div>

            {/* Row 4: Buttons */}
            <div className="flex gap-1.5 mt-2">
              <a
                href={`tel:${teacher.phone_number || ""}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1 h-8 rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-semibold shadow-sm shadow-violet-600/30 hover:shadow-lg hover:shadow-violet-600/40 active:scale-[0.97] transition-all"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <span className="flex-1 flex items-center justify-center gap-1 h-8 rounded-lg bg-violet-50/50 text-violet-600 text-[11px] font-semibold border border-violet-100 hover:bg-violet-50 active:scale-[0.97] transition-all">
                View Profile
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
