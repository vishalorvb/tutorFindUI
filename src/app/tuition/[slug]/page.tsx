import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { mockTuitions } from "@/data/mockTuitions";
import DetailLayout from "@/components/tuitionDetail/DetailLayout";
import TuitionHeader from "@/components/tuitionDetail/TuitionHeader";
import TuitionInfo from "@/components/tuitionDetail/TuitionInfo";
import TuitionDescription from "@/components/tuitionDetail/TuitionDescription";
import ContactCard from "@/components/tuitionDetail/ContactCard";
import MobileCTA from "@/components/tuitionDetail/MobileCTA";
import SimilarTuitions from "@/components/tuitionDetail/SimilarTuitions";
import FAQSection from "@/components/tuitionDetail/FAQSection";

function getTuition(slug: string) {
  return mockTuitions.find((t) => t.slug === slug);
}

function getSimilarTuitions(slug: string) {
  const tuition = getTuition(slug);
  if (!tuition) return [];
  return mockTuitions
    .filter(
      (t) =>
        t.slug !== slug &&
        (t.subject === tuition.subject || t.city === tuition.city)
    )
    .slice(0, 4);
}

// ─── Dynamic SEO Metadata ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tuition = getTuition(slug);
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

// ─── Static params for build-time generation ───
export function generateStaticParams() {
  return mockTuitions.map((t) => ({ slug: t.slug }));
}

// ─── Page ───
export default async function TuitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tuition = getTuition(slug);
  if (!tuition) notFound();

  const similar = getSimilarTuitions(slug);
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
      name: "TutorFind",
      sameAs: "https://tutorfind.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DetailLayout>
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/tuition" className="hover:text-violet-600 transition-colors font-medium">Tuitions</Link>
          <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-none">{tuition.subject} — {tuition.course}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Unified main card — full-bleed on mobile, card on desktop */}
          <div className="lg:col-span-2 order-1">
            <div className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-lg sm:shadow-slate-200/70 border-0 sm:border sm:border-slate-100 overflow-hidden -mx-4 sm:mx-0">
              <TuitionHeader tuition={tuition} />
              <div className="px-4 sm:px-8 pb-5 sm:pb-8 space-y-5">
                <TuitionInfo tuition={tuition} />
                <TuitionDescription tuition={tuition} />
              </div>
            </div>
          </div>

          {/* Sidebar — hidden on mobile, sticky on desktop */}
          <div className="hidden lg:block lg:row-span-3">
            <ContactCard tuition={tuition} />
          </div>

          {/* FAQ */}
          <div className="lg:col-span-2 order-3 lg:order-none">
            <FAQSection tuition={tuition} />
          </div>

          {/* Similar */}
          <div className="lg:col-span-2 order-4 lg:order-none">
            <SimilarTuitions tuitions={similar} />
          </div>
        </div>

        {/* Bottom spacer for mobile sticky CTA */}
        <div className="h-20 lg:hidden" />
      </DetailLayout>

      {/* Sticky bottom CTA — mobile only */}
      <MobileCTA tuition={tuition} />
    </>
  );
}
