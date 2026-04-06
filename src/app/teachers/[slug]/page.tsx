import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTeacherBySlug } from "@/lib/api/teacher";
import ProfileLayout from "@/components/teacherProfile/ProfileLayout";
import ProfileHeader from "@/components/teacherProfile/ProfileHeader";
import ProfileInfo from "@/components/teacherProfile/ProfileInfo";
import AboutSection from "@/components/teacherProfile/AboutSection";
import ContactCard from "@/components/teacherProfile/ContactCard";
import SimilarTeachers from "@/components/teacherProfile/SimilarTeachers";

// ─── Dynamic Metadata ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseSlug = slug.replace(/-\d+$/, "");
  try {
    const teacher = await getTeacherBySlug(baseSlug);
    return {
      title: `${teacher.subject} Teacher in ${teacher.location} | ${teacher.experience} Years Experience`,
      description: `Experienced ${teacher.subject} teacher in ${teacher.location}. Contact now for ${teacher.teaching_mode} tuition. Fee: ₹${teacher.fee}/month.`,
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
  // Strip trailing "-{id}" appended to slug in URLs
  const baseSlug = slug.replace(/-\d+$/, "");

  let teacher;
  try {
    teacher = await getTeacherBySlug(baseSlug);
  } catch {
    notFound();
  }

  return (
    <ProfileLayout>
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/teachers" className="hover:text-violet-600 transition-colors">Teachers</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">{teacher.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2">
          <ProfileHeader teacher={teacher} />
          <ProfileInfo teacher={teacher} />
          <AboutSection teacher={teacher} />
          <SimilarTeachers
            currentSlug={teacher.slug}
            subject={teacher.subject}
            location={teacher.location}
          />
        </div>

        {/* Sidebar */}
        <div>
          <ContactCard teacher={teacher} />
        </div>
      </div>
    </ProfileLayout>
  );
}
