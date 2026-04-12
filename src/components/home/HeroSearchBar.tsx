"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchBar() {
  const [type, setType] = useState<"teacher" | "tuition">("tuition");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    const base = type === "teacher" ? "/teachers" : "/tuition";
    router.push(`${base}${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-0">
      {/* Search bar */}
      <div className="flex items-stretch bg-white rounded-full shadow-xl shadow-black/10 overflow-hidden">
        {/* Type dropdown */}
        <div className="relative shrink-0 flex items-center">
          <select value={type} onChange={(e) => setType(e.target.value as "teacher" | "tuition")}
            className="pl-3 sm:pl-4 pr-7 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-700 bg-slate-50 rounded-full focus:outline-none cursor-pointer">
            <option value="tuition">Tuition</option>
            <option value="teacher">Teacher</option>
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Divider */}
        <div className="w-px my-1.5 bg-slate-200 shrink-0" />

        {/* Keyword input */}
        <div className="flex-1 min-w-0 flex items-center">
          <input type="text" placeholder="Subject, topic, city…" value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-slate-700 bg-transparent focus:outline-none placeholder:text-slate-400" />
        </div>

        {/* Search button — full height oval */}
        <button onClick={handleSearch}
          className="shrink-0 px-2.5  sm:px-3 flex items-center justify-center text-white transition-all duration-200 hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Popular tags */}
      <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5 justify-center items-center">
        <span className="text-[9px] text-cyan-300/60 font-semibold uppercase tracking-wider mr-0.5">
          <svg className="w-2.5 h-2.5 inline-block mr-0.5 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Trending
        </span>
        {["Math Tutor", "Physics", "English", "IIT-JEE", "NEET"].map((tag) => (
          <button key={tag} onClick={() => router.push(`/tuition?query=${encodeURIComponent(tag)}`)}
            className="text-[8px] font-normal text-cyan-200/70 hover:text-white border border-cyan-400/25 hover:border-cyan-400/50 hover:bg-cyan-400/10 px-2 py-0.5 rounded-lg transition-all duration-150">
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
