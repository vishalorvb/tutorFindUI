"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cities } from "@/data/mockTuitions";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState(searchParams.get("keyword") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [pincode, setPincode] = useState(searchParams.get("pincode") ?? "");
  const [cityFocused, setCityFocused] = useState(false);

  const filteredCities = city
    ? cities.filter((c) => c.toLowerCase().includes(city.toLowerCase()))
    : [];

  function handleSearch() {
    const params = new URLSearchParams();
    const keyword = [subject, city, pincode].filter(Boolean).join(" ").trim();
    if (keyword) {
      params.set("keyword", keyword);
    }
    if (city.trim()) {
      params.set("city", city.trim());
    }
    const qs = params.toString();
    router.push(qs ? `/tuition?${qs}` : "/tuition");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="w-full py-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Subject"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all shadow-sm"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            onFocus={() => setCityFocused(true)}
            onBlur={() => setTimeout(() => setCityFocused(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder="City"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all shadow-sm"
          />
          {cityFocused && city.length > 0 && filteredCities.length > 0 && (
            <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
              {filteredCities.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onMouseDown={() => { setCity(c); setCityFocused(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 transition-colors ${
                      city === c ? "text-violet-700 font-semibold bg-violet-50" : "text-slate-700"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="text"
          value={pincode}
          onChange={e => setPincode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pincode"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="flex items-center justify-center px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
