import type { Metadata } from "next";
import { getLatestTuitions, searchTuitions } from "@/lib/api/tuition";
import TuitionPageClient from "./TuitionPageClient";

type SearchParams = { query?: string; keyword?: string; city?: string; location?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { query = "", keyword = "", city = "", location = "" } = await searchParams;
  const q = (query || keyword).trim();
  const loc = (city || location).trim();

  if (q || loc) {
    const parts = [q, loc].filter(Boolean).join(" in ");
    const title = `${parts} — Tuition Requirements | HomeTutorly`;
    const description = `Browse tuition requirements for ${q || "all subjects"}${loc ? ` in ${loc}` : ""} on HomeTutorly. Connect with students looking for home and online tutors.`;
    return {
      title,
      description,
      openGraph: { title, description },
    };
  }

  return {
    title: "Find Tuition Near You | HomeTutorly",
    description:
      "Browse latest tuition requirements and connect with students near you. Find home and online tuition opportunities across India.",
    keywords:
      "tuition, home tuition, online tuition, tutor jobs, tuition near me, tuition requirements",
  };
}

export default async function TuitionPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query = "", keyword = "", city = "", location = "" } = await searchParams;
  const searchQuery = (query || keyword).trim();
  const searchCity = (city || location).trim();
  const isSearchMode = searchQuery.length > 0;

  let tuitions: import("@/types").Tuition[] = [];
  try {
    const combined = [searchQuery, searchCity].filter(Boolean).join(" ").trim();
    tuitions = combined
      ? await searchTuitions(1, combined)
      : await getLatestTuitions(1);
    if (!Array.isArray(tuitions)) tuitions = [];
  } catch {
    // tuitions already initialized as []
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: searchQuery
      ? `Tuition for ${searchQuery}${searchCity ? ` in ${searchCity}` : ""}`
      : "Latest Tuition Requirements",
    numberOfItems: tuitions.length,
    itemListElement: tuitions.slice(0, 10).map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "JobPosting",
        title: `${t.subject} Tutor for ${t.course}${t.city ? ` in ${t.city}` : ""}`,
        description: t.description || `${t.subject} tutor required for ${t.course}`,
        datePosted: t.posted_date,
        employmentType: "PART_TIME",
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: t.locality || "",
            addressRegion: t.city || "",
            postalCode: String(t.pincode || ""),
            addressCountry: "IN",
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TuitionPageClient
        initialTuitions={tuitions}
        keyword={searchQuery}
        city={searchCity}
      />
    </>
  );
}
