"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Teacher } from "@/types";
import { getLatestTeachers, searchTeachers } from "@/lib/api/teacher";
import TeacherList from "@/components/teacher/TeacherList";
import SearchBar from "@/components/tuition/SearchBar";

interface TeachersPageClientProps {
  initialTeachers: Teacher[];
  keyword: string;
  location: string;
}

export default function TeachersPageClient({
  initialTeachers,
  keyword,
  location,
}: TeachersPageClientProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchKw, setSearchKw] = useState(keyword);
  const [searchLoc, setSearchLoc] = useState(location);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialTeachers.length > 0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setTeachers(initialTeachers);
    setPage(1);
    setHasMore(initialTeachers.length > 0);
  }, [initialTeachers]);

  useEffect(() => {
    setSearchKw(keyword);
  }, [keyword]);

  useEffect(() => {
    setSearchLoc(location);
  }, [location]);

  const hasSearch = searchKw.trim().length > 0 || searchLoc.trim().length > 0;

  async function handleSearch(query: string, loc: string) {
    setIsSearching(true);
    try {
      const q = query.trim() || undefined;
      const l = loc.trim() || undefined;
      const results = (q || l)
        ? await searchTeachers(1, q, l)
        : await getLatestTeachers(1);

      setSearchKw(query);
      setSearchLoc(loc);
      setTeachers(Array.isArray(results) ? results : []);
      setPage(1);
      setHasMore(Array.isArray(results) && results.length > 0);

      const params = new URLSearchParams();
      if (query) params.set("keyword", query);
      if (loc) params.set("location", loc);
      const qs = params.toString();

      startTransition(() => {
        router.replace(qs ? `/teachers?${qs}` : "/teachers");
      });
    } finally {
      setIsSearching(false);
    }
  }

  async function loadMore() {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const q = searchKw.trim() || undefined;
      const l = searchLoc.trim() || undefined;
      const data = (q || l)
        ? await searchTeachers(nextPage, q, l)
        : await getLatestTeachers(nextPage);

      const items = Array.isArray(data) ? data : [];
      if (items.length === 0) {
        setHasMore(false);
      } else {
        setTeachers((prev) => [...prev, ...items]);
        setPage(nextPage);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="px-2 sm:px-6 py-4 sm:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {keyword ? `Tutors for "${keyword}"` : "Find Tutors Near You"}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Browse verified home and online tutors across India
        </p>
      </div>

      <SearchBar initialQuery={searchKw} initialLocation={searchLoc} loading={isSearching || isPending} onSearch={handleSearch} />

      <TeacherList teachers={teachers} keyword={keyword} />

      {hasMore && teachers.length > 0 && (
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
    </div>
  );
}
