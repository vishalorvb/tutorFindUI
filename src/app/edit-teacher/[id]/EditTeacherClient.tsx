"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TeacherLayout from "@/components/teacherOnboard/TeacherLayout";
import { getTeacherInfo, updateTeacher } from "@/lib/api/teacher";
import { getJwt } from "@/lib/auth/session";
import { useToast } from "@/components/toast/ToastContext";
import type { TeacherFormData } from "@/types";

const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Hindi", "Science", "Social Studies", "Computer Science", "Economics",
  "Accountancy", "Business Studies", "History", "Geography", "Political Science",
];
const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const modeOptions = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Home Tuition" },
  { value: "both", label: "Both" },
];

function ComboBox({
  value,
  options,
  placeholder,
  hasError,
  onChange,
}: {
  value: string;
  options: string[];
  placeholder: string;
  hasError: boolean;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value
    ? options.filter((o) => o.toLowerCase().includes(value.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 ${
          hasError ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100" : "border-gray-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-500"
        }`}
      />
      <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-44 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md py-0.5">
          {filtered.map((opt) => (
            <li
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-violet-50 hover:text-violet-700"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function EditTeacherClient({ teacherId }: { teacherId: number }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<TeacherFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTeacherInfo(teacherId)
      .then((teacher) => {
        setFormData({
          teacher_name: teacher.name,
          gender: teacher.gender?.toLowerCase() ?? "",
          age: String(teacher.age ?? ""),
          subject: teacher.subject ? teacher.subject.split(" ") : [],
          classes: teacher.classes ? teacher.classes.split(" ") : [],
          mode: teacher.teaching_mode ?? "",
          experience: String(teacher.experience ?? ""),
          qualification: teacher.qualification ?? "",
          about: teacher.about ?? "",
          fee: teacher.fee ?? "",
          location: teacher.location ?? "",
          pincode: String(teacher.pincode ?? ""),
          photo: null,
        });
      })
      .catch(() => setError("Failed to load teacher profile"))
      .finally(() => setFetching(false));
  }, [teacherId]);

  function handleChange(field: keyof TeacherFormData, value: string | string[] | File | null) {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    if (!formData) return false;
    const e: Record<string, string> = {};
    if (!formData.teacher_name.trim()) e.teacher_name = "Name is required";
    if (!formData.gender) e.gender = "Select gender";
    if (!formData.age || Number(formData.age) < 16) e.age = "Enter valid age (16+)";
    if (formData.subject.length === 0) e.subject = "Select a subject";
    if (formData.classes.length === 0) e.classes = "Select a class";
    if (!formData.mode) e.mode = "Select teaching mode";
    if (!formData.experience) e.experience = "Enter experience";
    if (!formData.qualification.trim()) e.qualification = "Enter qualification";
    if (!formData.about.trim() || formData.about.trim().length < 20) e.about = "Write at least 20 characters";
    if (!formData.fee) e.fee = "Enter fee";
    if (!formData.location.trim()) e.location = "Enter location";
    if (!formData.pincode || formData.pincode.length !== 6) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!formData || !validate()) return;
    setLoading(true);
    setError("");
    try {
      const jwt = getJwt();
      if (!jwt) { router.push("/login"); return; }
      await updateTeacher(teacherId, formData, jwt);
      showToast("Profile updated successfully!", "success");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const preview = formData?.photo ? URL.createObjectURL(formData.photo) : null;

  if (fetching) {
    return (
      <TeacherLayout>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-100 rounded w-1/3" />
            <div className="h-10 bg-gray-50 rounded" />
            <div className="h-10 bg-gray-50 rounded" />
            <div className="h-10 bg-gray-50 rounded w-2/3" />
          </div>
        </div>
      </TeacherLayout>
    );
  }

  if (error && !formData) {
    return (
      <TeacherLayout>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center">
          <p className="text-sm text-red-500">{error}</p>
          <button onClick={() => router.push("/dashboard")} className="mt-3 text-sm text-violet-600 font-medium">
            ← Back to Dashboard
          </button>
        </div>
      </TeacherLayout>
    );
  }

  if (!formData) return null;

  return (
    <TeacherLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-lg font-bold text-gray-900 mb-6">Edit Teacher Profile</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          <div className="space-y-5">
            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-violet-400 overflow-hidden"
                >
                  {preview ? (
                    <Image src={preview} alt="Preview" width={64} height={64} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gray-400 text-xs">Upload</span>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleChange("photo", e.target.files?.[0] ?? null)} />
                <span className="text-xs text-gray-500">JPG or PNG, max 2 MB</span>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.teacher_name}
                onChange={(e) => handleChange("teacher_name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
              {errors.teacher_name && <p className="text-red-500 text-xs mt-1">{errors.teacher_name}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" checked={formData.gender === g.toLowerCase()} onChange={() => handleChange("gender", g.toLowerCase())} className="accent-violet-600" />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                min={16}
                className="w-32 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <ComboBox
                value={formData.subject[0] ?? ""}
                options={subjectOptions}
                placeholder="Type or choose a subject..."
                hasError={!!errors.subject}
                onChange={(val) => { handleChange("subject", val ? [val] : []); }}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Classes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <ComboBox
                value={formData.classes[0] ?? ""}
                options={classOptions}
                placeholder="Type or choose a class..."
                hasError={!!errors.classes}
                onChange={(val) => { handleChange("classes", val ? [val] : []); }}
              />
              {errors.classes && <p className="text-red-500 text-xs mt-1">{errors.classes}</p>}
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Mode</label>
              <div className="flex gap-3">
                {modeOptions.map((m) => {
                  const active = formData.mode === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => handleChange("mode", m.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${active ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-600 border-gray-300 hover:border-violet-400"}`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
              {errors.mode && <p className="text-red-500 text-xs mt-1">{errors.mode}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                <input type="number" value={formData.experience} onChange={(e) => handleChange("experience", e.target.value)} min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none" />
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>
              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input type="text" value={formData.qualification} onChange={(e) => handleChange("qualification", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none" />
                {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
              </div>
              {/* Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Fee (₹)</label>
                <input type="number" value={formData.fee} onChange={(e) => handleChange("fee", e.target.value)} min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none" />
                {errors.fee && <p className="text-red-500 text-xs mt-1">{errors.fee}</p>}
              </div>
              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input type="text" value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none" />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / Area</label>
              <input type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none" />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
              <textarea value={formData.about} onChange={(e) => handleChange("about", e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none resize-none" />
              <div className="flex justify-between">
                {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about}</p>}
                <span className="text-xs text-gray-400 ml-auto">{formData.about.length} chars</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => router.push("/dashboard")} className="px-6 py-3 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                ← Back
              </button>
              <button type="button" disabled={loading} onClick={handleSubmit} className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg transition text-sm">
                {loading ? "Updating…" : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
