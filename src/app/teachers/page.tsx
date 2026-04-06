"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Teacher } from "@/types";
import { getLatestTeachers } from "@/lib/api/teacher";
import TeacherList, { TeacherCardSkeleton } from "@/components/teacher/TeacherList";

export default function TeachersPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const location = searchParams.get("location") ?? "";

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial fetch on mount or when search params change
  const fetchInitial = useCallback(async () => {
    setLoading(true);
    setError("");
    setPage(1);
    try {
      const data = await getLatestTeachers(1);
      setTeachers(Array.isArray(data) ? data : []);
      setHasMore(data.length > 0);
    } catch (err) {
      console.error("[TeachersPage] fetch error:", err);
      setError("Something went wrong. Please try again.");
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const data = await getLatestTeachers(nextPage);
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setTeachers((prev) => [...prev, ...data]);
        setPage(nextPage);
      }
    } catch {
      setError("Failed to load more teachers.");
    } finally {
      setLoadingMore(false);
    }
  }

  // Client-side filter by keyword / location
  const filtered = teachers.filter((t) => {
    const kw = keyword.toLowerCase();
    const loc = location.toLowerCase();
    const matchesKw =
      !kw ||
      t.name.toLowerCase().includes(kw) ||
      t.subject.toLowerCase().includes(kw) ||
      t.classes.toLowerCase().includes(kw) ||
      t.about?.toLowerCase().includes(kw);
    const matchesLoc =
      !loc ||
      t.location.toLowerCase().includes(loc) ||
      String(t.pincode).includes(loc);
    return matchesKw && matchesLoc;
  });

  return (
    <div className="px-2 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {keyword ? `Tutors for "${keyword}"` : "Find Tutors Near You"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse verified home and online tutors across India
        </p>
      </div>

      {/* Search bar */}
      <form method="GET" className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          name="keyword"
          defaultValue={keyword}
          placeholder="Subject, name…"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
        />
        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Location or pincode"
          className="flex-1 sm:max-w-[200px] border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
        >
          Search
        </button>
      </form>

      {/* Result count */}
      {!loading && !error && (
        <p className="text-sm text-slate-500 mb-4">
          <span className="font-bold text-slate-900">{filtered.length}</span> tutors found
          {(keyword || location) && (
            <a href="/teachers" className="ml-3 text-violet-600 hover:underline text-xs font-medium">
              Clear filters
            </a>
          )}
        </p>
      )}

      {/* States */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <TeacherCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <button
            onClick={fetchInitial}
            className="text-violet-600 hover:text-violet-700 font-semibold text-sm"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <TeacherList teachers={filtered} keyword={keyword} />

          {/* Load More */}
          {!keyword && !location && hasMore && filtered.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 rounded-xl text-sm font-semibold border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white transition disabled:opacity-50"
              >
                {loadingMore ? "Loading…" : "Load More Tutors"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
