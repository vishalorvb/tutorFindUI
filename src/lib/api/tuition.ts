import api from "./http";
import type { Tuition } from "@/types";

// ─── Fetch latest tuitions (paginated) ───

export async function getLatestTuitions(page: number = 1): Promise<Tuition[]> {
  const { data } = await api.get(`/tuition/getLatesttuition/${page}`);
  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
}

// ─── Search tuitions (paginated) ───

export async function searchTuitions(page: number = 1, query: string): Promise<Tuition[]> {
  const { data } = await api.get(`/tuition/search/${page}/`, { params: { query } });
  return Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
}

// ─── Get tuition by slug (extracts ID from end of slug) ───

export async function getTuitionBySlug(slug: string): Promise<Tuition> {
  const match = slug.match(/-(\d+)$/);
  if (!match) {
    throw new Error("Invalid tuition slug");
  }
  const id = match[1];
  const { data } = await api.get(`/tuition/getTuitionByid/${id}`);
  return data.data ?? data;
}

// ─── Create tuition ───

export interface CreateTuitionPayload {
  student_name: string;
  student_phone_number: string;
  course: string;
  subject: string;
  description: string;
  fee: string;
  mode: string;
  pincode: string;
  locality: string;
  photo?: File | null;
}

export async function createTuition(payload: CreateTuitionPayload, jwt: string): Promise<any> {
  const formData = new FormData();
  formData.append("student_name", payload.student_name);
  formData.append("student_phone_number", payload.student_phone_number);
  formData.append("course", payload.course);
  formData.append("subject", payload.subject);
  formData.append("description", payload.description);
  formData.append("fee", payload.fee);
  formData.append("mode", payload.mode);
  formData.append("pincode", payload.pincode);
  formData.append("locality", payload.locality);
  if (payload.photo) formData.append("photo", payload.photo);

  // Debug log
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[createTuition] JWT:", jwt);
  }

  const res = await api.post("/tuition/createTuition", formData, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
}

// ─── Toggle tuition status ───

export async function changeTuitionStatus(tuitionId: number): Promise<void> {
  await api.post("/tuition/changeStatus", { tuition_id: tuitionId });
}

// ─── Fetch current user's posted tuitions ───

export async function getMyPostedTuitions(): Promise<Tuition[]> {
  const { data } = await api.get("/tuition/getmypostedTuition");
  return data.data ?? [];
}
