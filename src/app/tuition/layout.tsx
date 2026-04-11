import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Tuition Near You | HomeTutorly",
  description:
    "Browse latest tuition requirements and connect with students near you. Find home and online tuition opportunities across India.",
  keywords:
    "tuition, home tuition, online tuition, tutor jobs, tuition near me, tuition requirements",
};

export default function TuitionSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
