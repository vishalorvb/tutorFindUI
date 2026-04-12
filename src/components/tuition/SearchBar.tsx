"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  loading?: boolean;
  onSearch: (query: string) => void | Promise<void>;
}

export default function SearchBar({ initialQuery = "", loading = false, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function handleSearch() {
    onSearch(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  function handleClear() {
    setQuery("");
    onSearch("");
  }

  return (
    <div className="w-full py-4">
      <div className="flex items-stretch bg-white rounded-full shadow-lg shadow-black/5 overflow-hidden border border-gray-100">
        {/* Search icon + input */}
        <div className="flex-1 min-w-0 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by subject, city, or pincode..."
            className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
          />
          {/* Clear button */}
          {query && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="shrink-0 mr-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="shrink-0 px-4 sm:px-5 flex items-center justify-center gap-1.5 text-white text-xs font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
          aria-label="Search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">{loading ? "Searching..." : "Search"}</span>
        </button>
      </div>
    </div>
  );
}
