import type { Metadata } from "next";
import EditTeacherClient from "./EditTeacherClient";

export const metadata: Metadata = {
  title: "Edit Teacher Profile | HomeTutorly",
  robots: "noindex, nofollow",
};

export default async function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditTeacherClient teacherId={Number(id)} />;
}
