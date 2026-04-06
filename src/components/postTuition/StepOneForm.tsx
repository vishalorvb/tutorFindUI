"use client";

import { useState, useRef, useEffect } from "react";
import type { StepOneFormProps } from "@/types";
import { colors } from "@/config/theme";

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
        className={`w-full rounded-xl border bg-white py-3.5 px-4 text-sm text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-200 placeholder:text-slate-400 ${
          hasError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-violet-400"
        }`}
      />
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70 py-1">
          {filtered.map((opt) => (
            <li
              key={opt}
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className="px-4 py-2.5 text-sm text-slate-700 cursor-pointer hover:bg-violet-50 hover:text-violet-700 transition-colors"
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
    <div className="space-y-6">
      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Subject <span className="text-red-400">*</span>
        </label>
        <ComboBox
          value={formData.subject}
          options={SUBJECTS}
          placeholder="Type or choose a subject..."
          hasError={!!errors.subject}
          onChange={(val) => { onChange("subject", val); setErrors((p) => ({ ...p, subject: "" })); }}
        />
        {errors.subject && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.subject}</p>}
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Class / Course <span className="text-red-400">*</span>
        </label>
        <ComboBox
          value={formData.course}
          options={COURSES}
          placeholder="Type or choose a class..."
          hasError={!!errors.course}
          onChange={(val) => { onChange("course", val); setErrors((p) => ({ ...p, course: "" })); }}
        />
        {errors.course && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.course}</p>}
      </div>

      {/* Teaching Mode */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Teaching Mode <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {MODES.map((mode) => {
            const selected = formData.teachingMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => { onChange("teachingMode", mode.value); setErrors((p) => ({ ...p, teachingMode: "" })); }}
                className={`relative flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  selected
                    ? "border-violet-400 bg-violet-50 text-violet-700 shadow-md shadow-violet-100"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-xl">{mode.icon}</span>
                {mode.label}
                {selected && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ background: colors.primary }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {errors.teachingMode && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.teachingMode}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Any specific requirements, preferred schedule, etc."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 placeholder:text-slate-400 resize-none"
        />
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleNext}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-violet-300/40 hover:shadow-violet-400/50 group"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      >
        <span className="flex items-center justify-center gap-2">
          Next → Add Details
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
