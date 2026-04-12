"use client";

import { useState } from "react";
import Link from "next/link";
import type { Tuition } from "@/types";
import { buildTuitionSearchHref } from "@/lib/tuitionSearch";

const MOCK_PHONE = "+91 98765 43210";

const MODE_LABELS: Record<string, string> = {
  online: "Online",
  home: "Home Tutor",
};

const MODE_STYLES: Record<string, string> = {
  online: "bg-blue-50 text-blue-600 border-blue-100",
  home: "bg-amber-50 text-amber-600 border-amber-100",
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function TuitionDetailClient({ tuition }: { tuition: Tuition }) {
  const [applied, setApplied] = useState(false);

  const location = [tuition.locality, tuition.city].filter(Boolean).join(", ");
  const city = tuition.city || tuition.locality || "your area";
  const modeLabel = MODE_LABELS[tuition.teaching_mode] ?? tuition.teaching_mode;
  const modeStyle = MODE_STYLES[tuition.teaching_mode] ?? "bg-gray-50 text-gray-600 border-gray-200";
  const subjectCityQuery = `${tuition.subject} ${city}`;
  const homeTuitionCityQuery = `home tuition ${city}`;

  function handleApply() {
    setApplied(true);
  }

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* ── Banner with subject initial overlay ── */}
        <div className="relative">
          <div className="h-16 sm:h-20 bg-linear-to-br from-violet-500 via-indigo-500 to-blue-500">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
          </div>
          {/* Avatar pinned bottom-left */}
          <div className="absolute left-3 sm:left-5 -bottom-6 sm:-bottom-7 z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-[3px] border-white shadow-md overflow-hidden bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          {/* Mode badge top-right */}
          <span className={`absolute top-2 right-3 sm:right-5 text-[9px] font-semibold px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${modeStyle}`}>
            {modeLabel}
          </span>
        </div>

        {/* ── Content ── */}
        <div className="pt-8 sm:pt-9 px-3 sm:px-5 pb-3">
          {/* Title row */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <h6 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              {tuition.subject} Tutor for {tuition.course}
            </h6>
            {tuition.verify && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Verified
              </span>
            )}
          </div>

          {/* ── Stats row ── */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] mb-2">
            {tuition.fee != null && (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ₹{Number(tuition.fee).toLocaleString("en-IN")}/mo
              </span>
            )}
            {tuition.fee != null && location && <span className="text-gray-300">·</span>}
            {location && (
              <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {location}
              </span>
            )}
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center gap-1 text-gray-500 font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {timeAgo(tuition.posted_date)}
            </span>
          </div>

          {/* ── Subject & Course chips ── */}
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="inline-flex items-center gap-0.5 bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-md text-[10px] font-semibold">
              <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              {tuition.subject}
            </span>
            <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md text-[10px] font-semibold">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              {tuition.course}
            </span>
            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border capitalize ${modeStyle}`}>
              {tuition.teaching_mode === "online" ? (
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ) : (
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" /></svg>
              )}
              {tuition.teaching_mode}
            </span>
          </div>

          {/* ── Description ── */}
          {tuition.description && (
            <div className="mb-2 px-3 py-2 rounded-lg border border-indigo-100/60 bg-linear-to-br from-indigo-50/40 via-white to-violet-50/40">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h6 className="text-xs font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Requirement Details</h6>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed">{tuition.description}</p>
            </div>
          )}

          {/* ── Apply / Contact ── */}
          {!applied ? (
            <button
              onClick={handleApply}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-white text-sm font-bold transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Apply & Get Contact
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[11px] font-bold text-emerald-700">Applied! Contact revealed below</span>
              </div>
              <a
                href={`tel:${MOCK_PHONE.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-white text-sm font-bold transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {MOCK_PHONE}
              </a>
            </div>
          )}

          {/* SEO hidden text */}
          <h2 className="sr-only">
            {tuition.subject} Tutor Needed for {tuition.course} in {city}
          </h2>
          <p className="sr-only">
            Looking for a {tuition.subject} tutor for {tuition.course} in {city}. 
            This is a {tuition.teaching_mode} tuition opportunity. Apply now to connect with the student.
          </p>
        </div>
      </section>

      {/* ── SEO Links Section ── */}
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-linear-to-r from-violet-50/60 via-white to-indigo-50/60">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className="text-sm font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Related Searches</h2>
        </div>
        <div className="p-4">
          <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
            Looking for{" "}
            <Link href={buildTuitionSearchHref(subjectCityQuery)} className="font-semibold text-violet-600 hover:underline underline-offset-2">
              {tuition.subject} tuition jobs in {city}
            </Link>{" "}
            for {tuition.course}? Many students need qualified{" "}
            <Link href={buildTuitionSearchHref(city)} className="font-semibold text-violet-600 hover:underline underline-offset-2">
              tutors in {city}
            </Link>.
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Link
              href={buildTuitionSearchHref(subjectCityQuery)}
              className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 transition-all"
            >
              {tuition.subject} tutors in {city} →
            </Link>
            <Link
              href={buildTuitionSearchHref(homeTuitionCityQuery)}
              className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 transition-all"
            >
              Home tuition in {city} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
