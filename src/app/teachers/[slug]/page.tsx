import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTeacherById } from "@/lib/api/teacher";
import TeacherProfile from "@/components/teacherProfile/TeacherProfile";
import SimilarTeachers from "@/components/teacherProfile/SimilarTeachers";

// ─── Dynamic Metadata ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const idMatch = slug.match(/-(\d+)$/);
  if (!idMatch) return { title: "Teacher Profile" };
  try {
    const teacher = await getTeacherById(Number(idMatch[1]));
    return {
      title: `${teacher.subject} Teacher in ${teacher.location} | HomeTutorly`,
      description: `Find experienced ${teacher.subject} tutor in ${teacher.location}. Contact now for tuition.`,
    };
  } catch {
    return { title: "Teacher Profile" };
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Extract ID from end of slug (e.g. "john-doe-1" → 1)
  const idMatch = slug.match(/-(\d+)$/);
  if (!idMatch) notFound();

  let teacher;
  try {
    teacher = await getTeacherById(Number(idMatch[1]));
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
          <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/teachers" className="hover:text-violet-600 transition-colors">Teachers</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-600 font-medium truncate">{teacher.name}</span>
        </nav>

        <div className="space-y-3">
          <TeacherProfile teacher={teacher} />
          <SimilarTeachers
            currentSlug={teacher.slug}
            subject={teacher.subject}
            location={teacher.location}
          />
        </div>
      </div>
    </div>
  );
}
