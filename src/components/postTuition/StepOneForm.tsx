"use client";

import { useState, useRef, useEffect } from "react";
import type { StepOneFormProps } from "@/types";

const SUBJECTS = ["Math", "Physics", "Chemistry", "English", "Coding", "Biology", "Accounts", "Economics"];
const COURSES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12", "Graduation", "Post Graduation", "Competitive Exams",
];
const MODES = [
  { value: "online", label: "Online", icon: "💻" },
  { value: "home", label: "Home", icon: "🏠" },
  { value: "both", label: "Both", icon: "🔄" },
] as const;

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
        className={`w-full h-9 rounded-lg border bg-white px-3 text-[13px] outline-none transition placeholder:text-gray-400 ${
          hasError ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-100" : "border-gray-200 focus:border-violet-400 focus:ring-1 focus:ring-violet-100"
        }`}
      />
      <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-40 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md py-0.5">
          {filtered.map((opt) => (
            <li
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className="px-3 py-1.5 text-[13px] text-gray-700 cursor-pointer hover:bg-violet-50 hover:text-violet-700"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StepOneForm({ formData, onChange, onNext }: StepOneFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!formData.subject) errs.subject = "Please select a subject";
    if (!formData.course) errs.course = "Please select a class / course";
    if (!formData.teachingMode) errs.teachingMode = "Please choose a teaching mode";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <div className="space-y-3.5">
      {/* Subject */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Subject <span className="text-red-400">*</span>
        </label>
        <ComboBox
          value={formData.subject}
          options={SUBJECTS}
          placeholder="Type or choose a subject..."
          hasError={!!errors.subject}
          onChange={(val) => { onChange("subject", val); setErrors((p) => ({ ...p, subject: "" })); }}
        />
        {errors.subject && <p className="mt-1 text-[11px] text-red-500">{errors.subject}</p>}
      </div>

      {/* Course */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
          Class / Course <span className="text-red-400">*</span>
        </label>
        <ComboBox
          value={formData.course}
          options={COURSES}
          placeholder="Type or choose a class..."
          hasError={!!errors.course}
          onChange={(val) => { onChange("course", val); setErrors((p) => ({ ...p, course: "" })); }}
        />
        {errors.course && <p className="mt-1 text-[11px] text-red-500">{errors.course}</p>}
      </div>

      {/* Teaching Mode */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1.5">
          Teaching Mode <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          {MODES.map((mode) => {
            const selected = formData.teachingMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => { onChange("teachingMode", mode.value); setErrors((p) => ({ ...p, teachingMode: "" })); }}
                className={`flex-1 flex items-center justify-center gap-1 h-9 rounded-lg border text-[12px] font-semibold transition-all ${
                  selected
                    ? "border-violet-400 bg-violet-50 text-violet-700"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-[13px]">{mode.icon}</span>
                {mode.label}
              </button>
            );
          })}
        </div>
        {errors.teachingMode && <p className="mt-1 text-[11px] text-red-500">{errors.teachingMode}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
        <textarea
          rows={2}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Any specific requirements..."
          className="w-full h-16 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-1 focus:ring-violet-100 resize-none"
        />
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full h-10 rounded-lg bg-violet-600 text-white text-[13px] font-bold hover:bg-violet-700 active:scale-[0.99] transition-all"
      >
        Next → Add Details
      </button>
    </div>
  );
}
