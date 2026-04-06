import { buildUrl } from "./http";
import type { TeacherFormData, Teacher } from "@/types";

// ─── Fetch latest teachers (paginated) ───

export async function getLatestTeachers(page: number = 1): Promise<Teacher[]> {
  const res = await fetch(buildUrl(`/teacher/latestTeacher/${page}`));
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to fetch teachers: ${res.status}`);
  }
  const json = await res.json();
  return Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : [];
}

export async function getTeacherBySlug(slug: string): Promise<Teacher> {
  const res = await fetch(buildUrl(`/teacher/getTeacherBySlug/${slug}`), {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Teacher not found: ${res.status}`);
  }
  const json = await res.json();
  return json.data ?? json;
}

export async function createTeacher(data: TeacherFormData, jwt: string) {
  const formData = new FormData();
  formData.append("teacher_name", data.teacher_name);
  formData.append("gender", data.gender);
  formData.append("age", data.age);
  formData.append("experience", data.experience);
  formData.append("qualification", data.qualification);
  formData.append("subject", data.subject.join(" "));
  formData.append("classes", data.classes.join(" "));
  formData.append("about", data.about);
  formData.append("mode", data.mode);
  formData.append("fee", data.fee);
  formData.append("pincode", data.pincode);
  formData.append("location", data.location);
  if (data.photo) formData.append("photo", data.photo);

  const res = await fetch(buildUrl("/teacher/create_teacher"), {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}
