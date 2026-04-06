import { buildUrl } from "./http";
import type { Tuition } from "@/types";

// ─── Fetch latest tuitions (paginated) ───

export async function getLatestTuitions(page: number = 1): Promise<Tuition[]> {
  const res = await fetch(buildUrl(`/tuition/getLatesttuition/${page}`));
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to fetch latest tuitions: ${res.status}`);
  }
  const json = await res.json();
  return Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : [];
}

// ─── Search tuitions (paginated) ───

export async function searchTuitions(page: number = 1, query: string): Promise<Tuition[]> {
  const encoded = encodeURIComponent(query);
  const res = await fetch(buildUrl(`/tuition/search/${page}/`) + `?query=${encoded}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to search tuitions: ${res.status}`);
  }
  const json = await res.json();
  return Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : [];
}

// ─── Get tuition by slug (extracts ID from end of slug) ───

export async function getTuitionBySlug(slug: string): Promise<Tuition> {
  const match = slug.match(/-(\d+)$/);
  if (!match) {
    throw new Error("Invalid tuition slug");
  }
  const id = match[1];
  const res = await fetch(buildUrl(`/tuition/getTuitionByid/${id}`));
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to fetch tuition: ${res.status}`);
  }
  const json = await res.json();
  return json.data ?? json;
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

  const res = await fetch(buildUrl("/tuition/createTuition"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      // Do NOT set Content-Type when sending FormData
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}
