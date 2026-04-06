"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { TeacherStepTwoProps } from "@/types";

export default function StepTwoForm({
  formData,
  onChange,
  onBack,
  onSubmit,
  loading,
}: TeacherStepTwoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.experience) e.experience = "Enter experience";
    if (!formData.qualification.trim()) e.qualification = "Enter qualification";
    if (!formData.about.trim() || formData.about.trim().length < 20)
      e.about = "Write at least 20 characters about yourself";
    if (!formData.fee) e.fee = "Enter your fee";
    if (!formData.location.trim()) e.location = "Enter location";
    if (!formData.pincode || formData.pincode.length !== 6) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onChange("photo", file);
  }

  const preview = formData.photo ? URL.createObjectURL(formData.photo) : null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>

      {/* Photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-violet-400 overflow-hidden"
          >
            {preview ? (
              <Image src={preview} alt="Preview" width={80} height={80} className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-xs text-center">Upload</span>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          <span className="text-xs text-gray-500">JPG or PNG, max 2 MB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => onChange("experience", e.target.value)}
            placeholder="e.g. 3"
            min={0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
          {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
          <input
            type="text"
            value={formData.qualification}
            onChange={(e) => onChange("qualification", e.target.value)}
            placeholder="e.g. B.Ed, M.Sc"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
          {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
        </div>

        {/* Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Fee (₹)</label>
          <input
            type="number"
            value={formData.fee}
            onChange={(e) => onChange("fee", e.target.value)}
            placeholder="e.g. 5000"
            min={0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
          {errors.fee && <p className="text-red-500 text-xs mt-1">{errors.fee}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit pincode"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location / Area</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="e.g. Kalkaji, New Delhi"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
        />
        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
      </div>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
        <textarea
          value={formData.about}
          onChange={(e) => onChange("about", e.target.value)}
          rows={4}
          placeholder="Describe your teaching experience, methodology, achievements…"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none resize-none"
        />
        <div className="flex justify-between">
          {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about}</p>}
          <span className="text-xs text-gray-400 ml-auto">{formData.about.length} chars</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => validate() && onSubmit()}
          className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg transition text-sm"
        >
          {loading ? "Submitting…" : "Start Getting Students"}
        </button>
      </div>
    </div>
  );
}
