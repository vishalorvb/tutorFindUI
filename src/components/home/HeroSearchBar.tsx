"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Hindi", "History", "Geography", "Computer Science",
  "Economics", "Coding / Programming", "Music",
];

export default function HeroSearchBar() {
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleSearch() {
    const parts = [subject, location].filter(Boolean);
    const keyword = parts.join(" ");
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    router.push(`/tuition${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <>
      {/* Search Bar */}
      <div className="rounded-2xl p-1.5 border border-white/20 max-w-xl mx-auto lg:mx-0 shadow-2xl"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
        <div className="flex flex-col sm:flex-row gap-1.5">
          {/* Subject dropdown */}
          <div className="flex-1 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}
              className="w-full pl-10 pr-8 py-3.5 text-sm font-medium text-white bg-transparent border border-white/15 rounded-xl focus:outline-none focus:border-violet-400 appearance-none cursor-pointer placeholder:text-white/50">
              <option value="" className="text-slate-800 bg-white">Select Subject</option>
              {SUBJECTS.map((s) => <option key={s} value={s} className="text-slate-800 bg-white">{s}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Location input */}
          <div className="flex-1 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input type="text" placeholder="Your city…" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 text-sm font-medium text-white bg-transparent border border-white/15 rounded-xl focus:outline-none focus:border-violet-400 placeholder:text-white/40" />
          </div>

          {/* Search button */}
          <button onClick={handleSearch} className="font-bold px-7 py-3.5 rounded-xl text-sm whitespace-nowrap flex items-center gap-2 justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-amber-400/30"
            style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)", color: "#0f172a" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Popular tags */}
      <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start items-center">
        <span className="text-xs text-white/40 font-medium">Popular:</span>
        {["Math Tutor", "Physics", "English", "IIT-JEE", "NEET"].map((tag) => (
          <button key={tag} onClick={() => router.push(`/tuition?keyword=${encodeURIComponent(tag)}`)}
            className="text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-200">
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}
