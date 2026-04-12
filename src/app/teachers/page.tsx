import type { Metadata } from "next";
import { getLatestTeachers } from "@/lib/api/teacher";
import TeachersPageClient from "./TeachersPageClient";

export const metadata: Metadata = {
  title: "Find Tutors Near You | HomeTutorly",
  description:
    "Browse verified home and online tutors across India. Find experienced teachers for any subject, class, and location.",
  keywords:
    "tutors near me, home tutor, online tutor, private tutor, tuition teacher, find teacher",
};

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; location?: string }>;
}) {
  const { keyword = "", location = "" } = await searchParams;

  let teachers: import("@/types").Teacher[] = [];
  try {
    teachers = await getLatestTeachers(1);
    if (!Array.isArray(teachers)) teachers = [];
  } catch {
    // teachers already initialized as []
  }

  return (
    <TeachersPageClient
      key={`${keyword}-${location}`}
      initialTeachers={teachers}
      keyword={keyword}
      location={location}
    />
  );
}
