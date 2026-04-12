"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { buildTuitionSearchHref } from "@/lib/tuitionSearch";

export default function SearchRedirectClient({ query }: { query: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(buildTuitionSearchHref(query));
  }, [query, router]);

  return null;
}