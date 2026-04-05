"use client";

import { useState } from "react";
import type { Tuition } from "@/types";
import { colors } from "@/config/theme";

const MOCK_PHONE = "+91 98765 43210";

export default function MobileCTA({ tuition }: { tuition: Tuition }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden">
      {/* Frosted glass bar */}
      <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-bottom">
        {!applied ? (
          <div className="flex items-center gap-3">
            {/* Fee info */}
            <div className="flex-1 min-w-0">
              {tuition.fee != null && (
                <p className="text-lg font-extrabold text-slate-900">
                  ₹{tuition.fee.toLocaleString("en-IN")}
                  <span className="text-xs font-medium text-slate-400">/mo</span>
                </p>
              )}
              <p className="text-[11px] text-emerald-600 font-semibold">🔓 Free to contact</p>
            </div>

            {/* CTA button */}
            <button
              onClick={() => setApplied(true)}
              className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.97] shadow-lg shadow-violet-300/40"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              Apply Now
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Phone revealed */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Contact</p>
              <p className="text-base font-extrabold text-slate-900 tracking-wide">{MOCK_PHONE}</p>
            </div>

            {/* Call button */}
            <a
              href={`tel:${MOCK_PHONE.replace(/\s/g, "")}`}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.97] shadow-lg shadow-emerald-200/50"
              style={{ background: `linear-gradient(135deg, ${colors.success}, #34d399)` }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
