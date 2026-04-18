import api from "./http";
import type { TeacherFormData, Teacher } from "@/types";

// ─── Fetch latest teachers (paginated) ───

export async function getLatestTeachers(page: number = 1): Promise<Teacher[]> {
  const { data } = await api.get(`/teacher/latestTeacher/${page}`);
  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
}

// ─── Search teachers (paginated, query + location) ───

export async function searchTeachers(page: number = 1, query?: string, location?: string): Promise<Teacher[]> {
  const params: Record<string, string> = {};
  if (query) params.query = query;
  if (location) params.location = location;
  const { data } = await api.get(`/teacher/search/${page}/`, { params });
  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
}

export async function getTeacherBySlug(slug: string): Promise<Teacher> {
  const { data } = await api.get(`/teacher/getTeacherBySlug/${slug}`);
  return data.data ?? data;
}

// ─── Fetch teacher by ID ───

export async function getTeacherById(id: number): Promise<Teacher> {
  const { data } = await api.get(`/teacher/getTeacherById/${id}`);
  return data.data ?? data;
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

  const res = await api.post("/teacher/create_teacher", formData, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
}

// ─── Fetch current user's teacher profiles ───

export async function getMyTeacherProfiles(): Promise<Teacher[]> {
  const { data } = await api.get("/teacher/my-teacher-profile");
  return data.teachers ?? [];
}

// ─── Fetch single teacher info by ID ───

export async function getTeacherInfo(id: number): Promise<Teacher> {
  const { data } = await api.get(`/teacher/getTecher_info/${id}`);
  return data;
}

// ─── Update teacher profile ───

export async function updateTeacher(id: number, data: TeacherFormData, jwt: string) {
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

  const res = await api.put(`/teacher/update_teacher_profile/${id}`, formData, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
}
