"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  loading?: boolean;
  onSearch: (query: string, location: string) => void | Promise<void>;
}

export default function SearchBar({ initialQuery = "", initialLocation = "", loading = false, onSearch }: SearchBarProps) {
  const [need, setNeed] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setNeed(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  function handleSearch() {
    onSearch(need.trim(), location.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  function handleClear() {
    setNeed("");
    setLocation("");
    onSearch("", "");
  }

  const hasInput = need || location;

  return (
    <div className="w-full py-3">
      <div className="flex items-stretch bg-white rounded-full shadow-md shadow-black/5 overflow-hidden border border-gray-100">
        {/* Need input */}
        <div className="flex-1 min-w-0 flex items-center border-r border-gray-100">
          <svg className="shrink-0 ml-3 w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Subject, class..."
            className="w-full px-2 py-2 text-[13px] font-medium text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:text-[11px] sm:placeholder:text-xs"
          />
        </div>

        {/* Location input */}
        <div className="flex-1 min-w-0 flex items-center">
          <svg className="shrink-0 ml-2.5 w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Area, pincode..."
            className="w-full px-2 py-2 text-[13px] font-medium text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:text-[11px] sm:placeholder:text-xs"
          />
          {/* Clear button */}
          {hasInput && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="shrink-0 mr-1 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="shrink-0 px-3 sm:px-4 flex items-center justify-center gap-1 text-white text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
          aria-label="Search"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">{loading ? "Searching..." : "Search"}</span>
        </button>
      </div>
    </div>
  );
}
