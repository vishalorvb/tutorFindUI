import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getTuitionBySlug } from "@/lib/api/tuition";
import TuitionDetailClient from "@/components/tuitionDetail/TuitionDetailClient";
import MobileCTA from "@/components/tuitionDetail/MobileCTA";
import FAQSection from "@/components/tuitionDetail/FAQSection";

function isValidSlug(slug: string) {
  return /-\d+$/.test(slug);
}

async function fetchTuition(slug: string) {
  if (!isValidSlug(slug)) return null;
  try {
    return await getTuitionBySlug(slug);
  } catch {
    return null;
  }
}

// ─── Dynamic SEO Metadata ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    const query = slug.replace(/[-_]+/g, " ").trim();
    return { title: `Search: ${query} | Home Tuition` };
  }
  const tuition = await fetchTuition(slug);
  if (!tuition) return { title: "Tuition Not Found" };

  const city = tuition.city || tuition.locality || "";
  const title = `${tuition.subject} Tutor Needed for ${tuition.course}${city ? ` in ${city}` : ""} | Home Tuition`;
  const description = `Looking for ${tuition.subject} tutor for ${tuition.course}${city ? ` in ${city}` : ""}. Apply now to connect with students.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

// ─── Page ───
export default async function TuitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // If slug doesn't match a valid tuition pattern, use it as a search query
  if (!isValidSlug(slug)) {
    const query = slug.replace(/[-_]+/g, " ").trim();
    redirect(`/tuition?keyword=${encodeURIComponent(query)}`);
  }

  const tuition = await fetchTuition(slug);
  if (!tuition) notFound();

  const city = tuition.city || tuition.locality || "";

  // JSON-LD: JobPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${tuition.subject} Tutor Needed for ${tuition.course}${city ? ` in ${city}` : ""}`,
    description: tuition.description || `${tuition.subject} tutor required for ${tuition.course}`,
    datePosted: tuition.posted_date,
    employmentType: "PART_TIME",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: tuition.locality || "",
        addressRegion: city,
        postalCode: tuition.pincode || "",
        addressCountry: "IN",
      },
    },
    ...(tuition.fee != null && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: { "@type": "QuantitativeValue", value: tuition.fee, unitText: "MONTH" },
      },
    }),
    hiringOrganization: {
      "@type": "Organization",
      name: "HomeTutorly",
      sameAs: "https://hometutorly.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/tuition" className="hover:text-violet-600 transition-colors">Tuitions</Link>
            <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600 font-medium truncate">{tuition.subject} — {tuition.course}</span>
          </nav>

          <div className="space-y-3">
            <TuitionDetailClient tuition={tuition} />
            <FAQSection tuition={tuition} />
          </div>

          {/* Bottom spacer for mobile sticky CTA */}
          <div className="h-20 lg:hidden" />
        </div>
      </div>

      {/* Sticky bottom CTA — mobile only */}
      <MobileCTA tuition={tuition} />
    </>
  );
}
