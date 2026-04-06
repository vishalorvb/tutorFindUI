import { apiRequest } from "./http";

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

  const res = await fetch("http://localhost:8000/tuition/createTuition", {
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
