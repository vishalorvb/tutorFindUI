"use client";

import { useState, useRef } from "react";
import type { StepTwoFormProps } from "@/types";
import { colors } from "@/config/theme";

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
    `w-full rounded-xl border bg-white py-3.5 px-4 text-sm text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-200 placeholder:text-slate-400 ${
      errors[field] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-violet-400"
    }`;

  function clearError(field: string) {
    setErrors((p) => ({ ...p, [field]: "" }));
  }

  return (
    <div className="space-y-5">
      {/* Student Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Student Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.studentName}
          onChange={(e) => { onChange("studentName", e.target.value); clearError("studentName"); }}
          placeholder="e.g. Rahul Sharma"
          className={inputClass("studentName")}
        />
        {errors.studentName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.studentName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-sm text-slate-500 font-medium">
            +91
          </span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => { onChange("phone", e.target.value.replace(/\D/g, "")); clearError("phone"); }}
            placeholder="9876543210"
            className={`flex-1 rounded-r-xl rounded-l-none border bg-white py-3.5 px-4 text-sm text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-200 placeholder:text-slate-400 ${
              errors.phone ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-violet-400"
            }`}
          />
        </div>
        {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>}
      </div>

      {/* Fee + Pincode row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Fee (₹/month)</label>
          <input
            type="number"
            inputMode="numeric"
            value={formData.fee}
            onChange={(e) => { onChange("fee", e.target.value); clearError("fee"); }}
            placeholder="5000"
            className={inputClass("fee")}
          />
          {errors.fee && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fee}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => { onChange("pincode", e.target.value.replace(/\D/g, "")); clearError("pincode"); }}
            placeholder="500001"
            className={inputClass("pincode")}
          />
          {errors.pincode && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.pincode}</p>}
        </div>
      </div>

      {/* Locality */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Locality <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.locality}
          onChange={(e) => { onChange("locality", e.target.value); clearError("locality"); }}
          placeholder="e.g. Banjara Hills, Hyderabad"
          className={inputClass("locality")}
        />
        {errors.locality && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.locality}</p>}
      </div>

      {/* Photo upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Photo (optional)</label>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-3 py-3.5 px-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-violet-300 bg-slate-50 hover:bg-violet-50/50 transition-all text-sm text-slate-500"
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {fileName || "Upload a photo"}
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 transition-all"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-violet-300/40 hover:shadow-violet-400/50 group"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
        >
          <span className="flex items-center justify-center gap-2">
            Find Tutors Now
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
