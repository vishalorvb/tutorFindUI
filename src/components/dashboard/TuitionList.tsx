"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Tuition } from "@/types";
import { getMyPostedTuitions, changeTuitionStatus } from "@/lib/api/tuition";

const modeConfig: Record<string, { bg: string; text: string; icon: string }> = {
  online: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "text-emerald-500" },
  home: { bg: "bg-violet-50", text: "text-violet-600", icon: "text-violet-500" },
  both: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
};

export default function TuitionList() {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const handleToggle = async (id: number, currentStatus: boolean) => {
    setTogglingId(id);
    // Optimistic update
    setTuitions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !currentStatus } : t))
    );
    try {
      await changeTuitionStatus(id);
    } catch {
      // Rollback on failure
      setTuitions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: currentStatus } : t))
      );
    } finally {
      setTogglingId(null);
    }
  };

  useEffect(() => {
    getMyPostedTuitions()
      .then(setTuitions)
      .catch(() => setError("Failed to load posted tuitions"))
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

  if (tuitions.length === 0) {
    return (
      <div className="mt-3 p-6 bg-white rounded-2xl border border-gray-100 text-center">
        <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">No tuitions posted yet</p>
        <button
          onClick={() => router.push("/post-tuition")}
          className="mt-2 text-xs text-blue-600 font-medium"
        >
          Post your first tuition →
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2.5">
      {tuitions.map((t) => {
        const mode = modeConfig[t.teaching_mode] ?? modeConfig.both;
        return (
          <div
            key={t.id}
            onClick={() => router.push(`/tuition/${t.slug}`)}
            className="group p-3.5 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-200"
          >
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${mode.bg}`}>
                <svg className={`w-5 h-5 ${mode.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-gray-900 truncate">{t.subject} – {t.course}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${mode.bg} ${mode.text}`}>
                    {t.teaching_mode}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] text-gray-400 truncate">
                    {t.locality}{t.pincode_info?.District ? `, ${t.pincode_info.District}` : ""}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                  <span className="text-[11px] font-medium text-gray-600 shrink-0">₹{t.fee}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(t.id, !!t.status);
                    }}
                    disabled={togglingId === t.id}
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none disabled:opacity-50 ${
                      t.status
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {t.status && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-[10px] font-medium ${t.status ? "text-green-600" : "text-gray-400"}`}>
                    {togglingId === t.id ? "Updating…" : t.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
