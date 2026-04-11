"use client";

import { useState, useRef } from "react";
import type { StepTwoFormProps } from "@/types";

export default function StepTwoForm({ formData, onChange, onBack, onSubmit }: StepTwoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!formData.studentName.trim()) errs.studentName = "Student name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) errs.phone = "Enter a valid 10-digit phone number";
    if (!formData.locality.trim()) errs.locality = "Locality is required";
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode.trim())) errs.pincode = "Enter a valid 6-digit pincode";
    if (formData.fee && Number(formData.fee) <= 0) errs.fee = "Fee must be a positive number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (validate()) onSubmit();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    onChange("photo", file);
    setFileName(file?.name || "");
  }

  const inputClass = (field: string) =>
    `w-full h-9 rounded-lg border bg-white px-3 text-[13px] outline-none transition placeholder:text-gray-400 ${
      errors[field] ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100" : "border-gray-200 focus:border-violet-400 focus:ring-1 focus:ring-violet-100"
    }`;

  function clearError(field: string) {
    setErrors((p) => ({ ...p, [field]: "" }));
  }

  return (
    <div className="space-y-3.5">
      {/* Student Name */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Student Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.studentName}
          onChange={(e) => { onChange("studentName", e.target.value); clearError("studentName"); }}
          placeholder="e.g. Rahul Sharma"
          className={inputClass("studentName")}
        />
        {errors.studentName && <p className="mt-1 text-[11px] text-red-500">{errors.studentName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-[13px] text-gray-500 font-medium">
            +91
          </span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => { onChange("phone", e.target.value.replace(/\D/g, "")); clearError("phone"); }}
            placeholder="9876543210"
            className={`flex-1 h-9 rounded-r-lg rounded-l-none border bg-white px-3 text-[13px] outline-none transition placeholder:text-gray-400 ${
              errors.phone ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100" : "border-gray-200 focus:border-violet-400 focus:ring-1 focus:ring-violet-100"
            }`}
          />
        </div>
        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
      </div>

      {/* Fee + Pincode row */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">Fee (₹/month)</label>
          <input
            type="number"
            inputMode="numeric"
            value={formData.fee}
            onChange={(e) => { onChange("fee", e.target.value); clearError("fee"); }}
            placeholder="5000"
            className={inputClass("fee")}
          />
          {errors.fee && <p className="mt-1 text-[11px] text-red-500">{errors.fee}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">Pincode</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => { onChange("pincode", e.target.value.replace(/\D/g, "")); clearError("pincode"); }}
            placeholder="500001"
            className={inputClass("pincode")}
          />
          {errors.pincode && <p className="mt-1 text-[11px] text-red-500">{errors.pincode}</p>}
        </div>
      </div>

      {/* Locality */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Locality <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.locality}
          onChange={(e) => { onChange("locality", e.target.value); clearError("locality"); }}
          placeholder="e.g. Banjara Hills, Hyderabad"
          className={inputClass("locality")}
        />
        {errors.locality && <p className="mt-1 text-[11px] text-red-500">{errors.locality}</p>}
      </div>

      {/* Photo upload */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Photo (optional)</label>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-gray-200 hover:border-violet-300 bg-gray-50 hover:bg-violet-50/50 transition text-[13px] text-gray-500"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {fileName || "Upload a photo"}
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="px-4 h-10 rounded-lg text-[13px] font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 h-10 rounded-lg bg-violet-600 text-white text-[13px] font-bold hover:bg-violet-700 active:scale-[0.99] transition-all"
        >
          Find Tutors Now
        </button>
      </div>
    </div>
  );
}
