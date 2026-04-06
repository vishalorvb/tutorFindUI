"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getLatestTeachers } from "@/lib/api/teacher";
import type { Teacher } from "@/types";

export default function SimilarTeachers({
  currentSlug,
  subject,
  location,
}: {
  currentSlug: string;
  subject: string;
  location: string;
}) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getLatestTeachers(1)
      .then((data) => {
        const filtered = data
          .filter(
            (t) =>
              t.slug !== currentSlug &&
              (t.subject?.toLowerCase().includes(subject.split(" ")[0]?.toLowerCase() ?? "") ||
                t.location?.toLowerCase() === location.toLowerCase())
          )
          .slice(0, 4);
        setTeachers(filtered.length > 0 ? filtered : data.filter((t) => t.slug !== currentSlug).slice(0, 4));
      })
      .catch(() => {});
  }, [currentSlug, subject, location]);

  if (teachers.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-24 lg:mb-6">
      <h2 className="text-base font-black text-slate-900 mb-4">Similar Teachers</h2>
      <div className="space-y-3">
        {teachers.map((t) => {
          const subjects = t.subject ? t.subject.split(/[\s,]+/).slice(0, 2) : [];
          return (
            <Link
              key={t.id}
              href={`/teachers/${t.slug}-${t.id}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-violet-100">
                <Image
                  src={t.photo || "/images/teacher/default.png"}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{t.name}</p>
                <p className="text-xs text-slate-500 truncate">{t.location}</p>
                <div className="flex gap-1 mt-1">
                  {subjects.map((s) => (
                    <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-black text-violet-700">&#8377;{t.fee}</p>
                <p className="text-[10px] text-slate-400">/month</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
