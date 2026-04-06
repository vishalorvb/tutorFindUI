import { buildUrl } from "./http";
import type { TeacherFormData } from "@/types";

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
