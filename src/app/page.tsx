import type { Metadata } from "next";
import Home from '@/components/home/Home';

export const metadata: Metadata = {
  title: "HomeTutorly — Find the Best Home & Online Tutors Near You",
  description:
    "Connect with 2,000+ verified home tutors and online tutors across India. Post your requirement, get matched instantly, and book a free demo class. Subjects: Math, Physics, Chemistry, English, Coding and more.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "HomeTutorly",
      url: "https://hometutorly.com",
      description:
        "Find verified home and online tutors across India. Book a free demo class today.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://hometutorly.com/tuition?keyword={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "HomeTutorly",
      url: "https://hometutorly.com",
      logo: "https://hometutorly.com/logo.png",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
