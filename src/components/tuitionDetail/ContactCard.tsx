"use client";

import { useState } from "react";
import type { Tuition } from "@/types";
import { colors } from "@/config/theme";

const MOCK_PHONE = "+91 98765 43210";

export default function ContactCard({ tuition }: { tuition: Tuition }) {
  const [applied, setApplied] = useState(false);
  const [unlocks, setUnlocks] = useState(tuition.unlocks);

  const location = [tuition.locality, tuition.city].filter(Boolean).join(", ");

  function handleApply() {
    setApplied(true);
    setUnlocks((prev) => prev + 1);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/70 border border-slate-100 overflow-hidden sticky top-24">
      {/* Gradient header */}
      <div
        className="px-6 py-4"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
          Tuition Details
        </h3>
      </div>

      <div className="p-6">
        {/* Info rows */}
        <div className="space-y-4 text-sm">
          {tuition.fee != null && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-50">
                  <svg className="w-3.5 h-3.5" fill="none" stroke={colors.primary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Fee
              </span>
              <span className="font-extrabold text-slate-900">₹{tuition.fee.toLocaleString("en-IN")}<span className="text-xs font-medium text-slate-400">/mo</span></span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50">
                {tuition.teaching_mode === "online" ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke={colors.secondary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke={colors.secondary} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                  </svg>
                )}
              </span>
              Mode
            </span>
            <span className="font-semibold text-slate-700 capitalize">{tuition.teaching_mode}</span>
          </div>
          {location && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50">
                  <svg className="w-3.5 h-3.5" fill="none" stroke={colors.success} viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Location
              </span>
              <span className="font-semibold text-slate-700 text-right max-w-[55%]">{location}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-50">
                <svg className="w-3.5 h-3.5" fill="none" stroke={colors.gold} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Applied
            </span>
            <span className="font-semibold text-slate-700">{unlocks}</span>
          </div>
        </div>

        <div className="my-5 border-t border-dashed border-slate-200" />

        {!applied ? (
          <>
            {/* Free phase banner */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 mb-5">
              <span className="text-lg">🔓</span>
              <div>
                <span className="text-xs font-bold text-emerald-700 block">
                  Contact details available
                </span>
                <span className="text-[11px] text-emerald-600/80">Free for now — limited time</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-violet-300/40 hover:shadow-violet-400/50 group relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Apply &amp; Get Contact
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </button>
          </>
        ) : (
          <>
            {/* Success banner */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-bold text-emerald-700">Applied successfully!</span>
            </div>

            {/* Contact revealed */}
            <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/50 p-4">
              <p className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-widest">Phone Number</p>
              <p className="text-lg font-extrabold text-slate-900 tracking-wide">{MOCK_PHONE}</p>
            </div>

            <a
              href={`tel:${MOCK_PHONE.replace(/\s/g, "")}`}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-200/50"
              style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.successLight})` }}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </>
        )}
      </div>
    </div>
  );
}
