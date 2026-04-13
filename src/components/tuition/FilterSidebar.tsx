"use client";

import { useState } from "react";
import Link from "next/link";

const POPULAR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
];

const FEE_MAX = 20000;
const FEE_STEP = 500;

function formatFee(val: number) {
  if (val >= FEE_MAX) return "Any";
  if (val >= 1000) return `₹${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
  return `₹${val}`;
}

interface FilterSidebarProps {
  onCityClick: (city: string) => void;
  onFilterChange: (filters: { teachingMode: string; feeRange: string }) => void;
  activeCity?: string;
  activeTeachingMode?: string;
  activeFeeRange?: string;
  cityHeading?: string;
  cityPrefix?: string;
  cityLinkBase?: string;
}

export default function FilterSidebar({
  onCityClick,
  onFilterChange,
  activeCity = "",
  activeTeachingMode = "",
  activeFeeRange = "",
  cityHeading = "Tuitions by City",
  cityPrefix = "Tuition in",
  cityLinkBase = "/tuition",
}: FilterSidebarProps) {
  const [teachingMode, setTeachingMode] = useState(activeTeachingMode);

  // Parse initial fee from activeFeeRange like "0-5000"
  const initialFee = activeFeeRange
    ? Number(activeFeeRange.split("-")[1]) || FEE_MAX
    : FEE_MAX;
  const [maxFee, setMaxFee] = useState(initialFee);

  function handleModeChange(mode: string) {
    const next = teachingMode === mode ? "" : mode;
    setTeachingMode(next);
    onFilterChange({
      teachingMode: next,
      feeRange: maxFee < FEE_MAX ? `0-${maxFee}` : "",
    });
  }

  function handleFeeSlide(val: number) {
    setMaxFee(val);
    onFilterChange({
      teachingMode,
      feeRange: val < FEE_MAX ? `0-${val}` : "",
    });
  }

  function handleClearFilters() {
    setTeachingMode("");
    setMaxFee(FEE_MAX);
    onFilterChange({ teachingMode: "", feeRange: "" });
  }

  const hasFilters = teachingMode || maxFee < FEE_MAX;
  const sliderPercent = (maxFee / FEE_MAX) * 100;

  return (
    <aside className="w-full">
      {/* ── Filters Card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-linear-to-r from-violet-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-xs font-semibold text-gray-800">Filters</span>
          </div>
          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="text-[10px] font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="px-3.5 py-3 space-y-4">
          {/* ── Teaching Mode ── */}
          <div>
            <p className="text-[11px] font-semibold text-gray-600 mb-2">Teaching Mode</p>
            <div className="flex gap-0 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
              <button
                onClick={() => handleModeChange("online")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[9px] font-semibold transition-all duration-200 ${
                  teachingMode === "online"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Online
              </button>
              <button
                onClick={() => handleModeChange("home")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[9px] font-semibold transition-all duration-200 border-l border-gray-200 ${
                  teachingMode === "home"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                </svg>
                Home
              </button>
            </div>
          </div>

          {/* ── Fee Range Slider ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-gray-600">Max Fee</p>
              <span className={`text-[11px] font-bold ${maxFee < FEE_MAX ? "text-violet-600" : "text-gray-400"}`}>
                {formatFee(maxFee)}
              </span>
            </div>
            <div className="relative pt-1 pb-1">
              <div className="relative h-1.5 bg-gray-100 rounded-full">
                <div
                  className="absolute h-full bg-linear-to-r from-violet-400 to-violet-500 rounded-full"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={FEE_MAX}
                step={FEE_STEP}
                value={maxFee}
                onChange={(e) => handleFeeSlide(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* Thumb indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-violet-500 rounded-full shadow-sm pointer-events-none"
                style={{ left: `calc(${sliderPercent}% - 7px)` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-gray-400">₹0</span>
              <span className="text-[9px] text-gray-400">₹20K+</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tuitions by City ── */}
      <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-3.5 py-2.5 bg-linear-to-r from-violet-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-semibold text-gray-800">{cityHeading}</span>
          </div>
        </div>

        <div className="p-2.5">
          <ul className="max-h-80 overflow-y-auto space-y-0.5 custom-scrollbar">
            {POPULAR_CITIES.map((c) => (
              <li key={c}>
                <Link
                  href={`${cityLinkBase}?location=${encodeURIComponent(c)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onCityClick(c);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.75 rounded-lg text-[11px] font-medium transition-all duration-150 ${
                    activeCity === c
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-violet-600"
                  }`}
                >
                  <svg className={`w-3 h-3 shrink-0 ${activeCity === c ? "text-violet-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {cityPrefix} {c}
                  <svg className={`w-3 h-3 ml-auto shrink-0 ${activeCity === c ? "text-violet-400" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
