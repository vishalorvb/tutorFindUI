"use client";

import { useRef, useState } from "react";
import type { TeacherStepOneProps } from "@/types";

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

// Reusable multi-select search box with tag chips
function MultiSearchInput({
  label,
  options,
  selected,
  onToggle,
  error,
  placeholder,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  error?: string;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o))
    : options.filter((o) => !selected.includes(o));

  function addCustom() {
    const val = query.trim();
    if (val && !selected.includes(val)) onToggle(val);
    setQuery("");
    setOpen(true);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !query && selected.length > 0) {
      onToggle(selected[selected.length - 1]);
    }
    if (e.key === "Escape") { setOpen(false); setQuery(""); }
    if ((e.key === "Enter" || e.key === ",") && query.trim()) {
      e.preventDefault();
      addCustom();
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`flex flex-wrap gap-1.5 min-h-[42px] px-2 py-1.5 border rounded-lg cursor-text focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-violet-500 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
      >
        {selected.map((s) => (
          <span
            key={s}
            className="flex items-center gap-1 px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-xs font-medium"
          >
            {s}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggle(s); }}
              className="hover:text-violet-900 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKey}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] text-sm outline-none bg-transparent py-0.5"
        />
      </div>
      {open && (filtered.length > 0 || (query.trim() && !selected.includes(query.trim()))) && (
        <ul className="mt-1 border border-gray-200 rounded-lg shadow-md bg-white max-h-44 overflow-y-auto z-10 relative">
          {query.trim() && !options.some(o => o.toLowerCase() === query.trim().toLowerCase()) && !selected.includes(query.trim()) && (
            <li
              onMouseDown={(e) => { e.preventDefault(); addCustom(); }}
              className="px-3 py-2 text-sm text-violet-700 font-medium hover:bg-violet-50 cursor-pointer border-b border-gray-100"
            >
              + Add &ldquo;{query.trim()}&rdquo;
            </li>
          )}
          {filtered.map((opt) => (
            <li
              key={opt}
              onMouseDown={(e) => { e.preventDefault(); onToggle(opt); setQuery(""); }}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function StepOneForm({ formData, onChange, onNext }: TeacherStepOneProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.teacher_name.trim()) e.teacher_name = "Name is required";
    if (!formData.gender) e.gender = "Select gender";
    if (!formData.age || Number(formData.age) < 16) e.age = "Enter valid age (16+)";
    if (formData.subject.length === 0) e.subject = "Select a subject";
    if (formData.classes.length === 0) e.classes = "Select a class";
    if (!formData.mode) e.mode = "Select teaching mode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function selectSingle(field: "subject" | "classes", val: string) {
    const arr = formData[field] as string[];
    // deselect if same, otherwise replace with new single value
    onChange(field, arr[0] === val ? [] : [val]);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Teaching Information</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={formData.teacher_name}
          onChange={(e) => onChange("teacher_name", e.target.value)}
          placeholder="Enter your full name"
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
              <input
                type="radio"
                name="gender"
                checked={formData.gender === g.toLowerCase()}
                onChange={() => onChange("gender", g.toLowerCase())}
                className="accent-violet-600"
              />
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
          onChange={(e) => onChange("age", e.target.value)}
          placeholder="Your age"
          min={16}
          className="w-32 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
        />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
      </div>

      {/* Subjects */}
      <MultiSearchInput
        label="Subjects you teach"
        options={subjectOptions}
        selected={formData.subject}
        onToggle={(val) => selectSingle("subject", val)}
        error={errors.subject}
        placeholder="Search or type a subject…"
      />

      {/* Classes */}
      <MultiSearchInput
        label="Classes you teach"
        options={classOptions}
        selected={formData.classes}
        onToggle={(val) => selectSingle("classes", val)}
        error={errors.classes}
        placeholder="Search or type a class…"
      />

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
                onClick={() => onChange("mode", m.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                  active
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-violet-400"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        {errors.mode && <p className="text-red-500 text-xs mt-1">{errors.mode}</p>}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => validate() && onNext()}
        className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition text-sm"
      >
        Next → Add Profile Details
      </button>
    </div>
  );
}
