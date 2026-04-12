"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Teacher } from "@/types";
import { getMyTeacherProfiles } from "@/lib/api/teacher";

export default function TeacherList() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyTeacherProfiles()
      .then(setTeachers)
      .catch(() => setError("Failed to load teacher profiles"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-3 space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-2.5 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 p-4 bg-white rounded-2xl border border-red-100 text-xs text-red-400 text-center">
        {error}
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="mt-3 p-6 bg-white rounded-2xl border border-gray-100 text-center">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">No teacher profiles yet</p>
        <button
          onClick={() => router.push("/become-teacher")}
          className="mt-2 text-xs text-blue-600 font-medium"
        >
          Create your first profile →
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2.5">
      {teachers.map((t) => (
        <div
          key={t.id}
          className="group p-3.5 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-200"
        >
          <div className="flex gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-gray-900 capitalize truncate leading-none">{t.subject} Teacher</span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  t.teaching_mode === "online"
                    ? "bg-emerald-50 text-emerald-600"
                    : t.teaching_mode === "both"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600"
                }`}>
                  {t.teaching_mode === "online" ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : t.teaching_mode === "both" ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                    </svg>
                  )}
                </span>
                <div className="ml-auto shrink-0">
                  <button
                    onClick={() => router.push(`/edit-teacher/${t.id}`)}
                    title="Edit profile"
                    className="p-1.5 rounded-lg hover:bg-violet-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] text-gray-400">{t.location}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span className="text-[11px] text-gray-400">{t.experience} yrs</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span className="text-[11px] font-medium text-gray-600">₹{t.fee}/hr</span>
              </div>
              {t.about && (
                <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2">{t.about}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
