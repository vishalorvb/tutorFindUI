import Image from "next/image";
import Link from "next/link";
import type { Teacher } from "@/types";
import { colors } from "@/config/theme";

const modeStyle: Record<string, string> = {
  online: "bg-blue-50 text-blue-600",
  offline: "bg-amber-50 text-amber-600",
  both: "bg-violet-50 text-violet-600",
};

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

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 sm:p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden bg-slate-100 border-2 border-violet-100 self-start">
          <Image
            src={photo || "/images/teacher/default.svg"}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + Mode */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 leading-snug">{name}</h3>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                modeStyle[teaching_mode] ?? "bg-gray-100 text-gray-500"
              }`}
            >
              {modeLabel}
            </span>
          </div>

          {/* Subject + Qualification */}
          <p className="text-sm text-violet-700 font-medium mt-0.5">
            Teaches: {subject}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{qualification}</p>

          {/* Location + Experience */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {[location, pincode].filter(Boolean).join(", ")}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {experience} experience
            </span>
          </div>

          {/* About */}
          {aboutTruncated && (
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{aboutTruncated}</p>
          )}

          {/* Footer: fee + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <span className="text-sm font-bold" style={{ color: colors.primary }}>
              ₹{fee}/mo
            </span>
            <Link
              href={`/teachers/${slug}-${teacher.id}`}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
