import Image from "next/image";
import type { Teacher } from "@/types";

const MODE_LABELS: Record<string, string> = {
  online: "Online",
  home: "Home Tutor",
  both: "Online & Home",
};

export default function ProfileHeader({ teacher }: { teacher: Teacher }) {
  const subjects = teacher.subject ? teacher.subject.split(/[\s,]+/).filter(Boolean) : [];
  const classes = teacher.classes ? teacher.classes.split(/[\s,]+/).filter(Boolean) : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      {/* Banner */}
      <div className="h-28 bg-gradient-to-r from-violet-600 to-indigo-600" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-14 mb-4 flex items-end gap-5">
          <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex-shrink-0 bg-violet-100">
            <Image
              src={teacher.photo || "/images/teacher/default.png"}
              alt={teacher.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Verified Tutor
            </span>
          </div>
        </div>

        {/* Name & qualification */}
        <h1 className="text-2xl font-black text-slate-900">{teacher.name}</h1>
        <p className="text-slate-500 text-sm mt-0.5">{teacher.qualification}</p>

        {/* Experience */}
        <p className="text-violet-600 font-semibold text-sm mt-1">
          {teacher.experience} {teacher.experience === 1 ? "year" : "years"} experience
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {subjects.map((s) => (
            <span key={s} className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
              {s}
            </span>
          ))}
          {classes.map((c) => (
            <span key={c} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              Class {c}
            </span>
          ))}
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
            {MODE_LABELS[teacher.teaching_mode] ?? teacher.teaching_mode}
          </span>
        </div>
      </div>
    </div>
  );
}
