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
        const keyword = subject.split(" ")[0]?.toLowerCase() ?? "";
        const filtered = data
          .filter(
            (t) =>
              t.slug !== currentSlug &&
              (t.subject?.toLowerCase().includes(keyword) ||
                t.location?.toLowerCase() === location.toLowerCase())
          )
          .slice(0, 4);
        setTeachers(filtered.length > 0 ? filtered : data.filter((t) => t.slug !== currentSlug).slice(0, 4));
      })
      .catch(() => {});
  }, [currentSlug, subject, location]);

  if (teachers.length === 0) return null;

  return (
    <section className="pb-20 sm:pb-0 bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-linear-to-r from-sky-50/60 via-white to-indigo-50/60">
        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-sm font-bold bg-linear-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Similar Teachers</h2>
      </div>
      <div className="p-4">
      <div className="space-y-2">
        {teachers.map((t) => {
          const hasPhoto = !!t.photo;
          return (
            <Link
              key={t.id}
              href={`/teachers/${t.slug}-${t.id}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
            >
              <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-linear-to-br from-violet-100 to-indigo-100">
                {hasPhoto ? (
                  <Image
                    src={t.photo!}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{t.name}</p>
                <p className="text-xs text-gray-500 truncate">{t.subject} · {t.location}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-violet-600">₹{t.fee}</p>
                <p className="text-[10px] text-gray-400">/month</p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </section>
  );
}
