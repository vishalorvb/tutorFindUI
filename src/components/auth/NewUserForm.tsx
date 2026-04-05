"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { FormErrors, NewUserFormData, NewUserFormProps } from "@/types";
import { colors, gradients, shadows } from "@/config/theme";

async function createUser(profile: NewUserFormData & { phoneNumber: string }): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.log("Creating user profile", profile);
}

function validate(data: NewUserFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

export default function NewUserForm({ phoneNumber }: NewUserFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<NewUserFormData>({
    fullName: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof NewUserFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createUser({ ...form, phoneNumber });
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-bold text-slate-900">Complete your profile</h2>
        <p className="text-sm text-slate-500">
          Finish setting up your account for +91 {phoneNumber}
        </p>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          autoFocus
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
            errors.fullName
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
          }`}
        />
        {errors.fullName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email Address
          <span className="ml-1 text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
          }`}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
        ) : (
          <p className="mt-1.5 text-xs text-slate-400">Use email to receive tutor recommendations and updates</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: gradients.primary,
          boxShadow: shadows.primaryButton,
        }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Completing profile…
          </span>
        ) : (
          "Complete Profile"
        )}
      </button>

      <p className="text-center text-xs text-slate-400 leading-relaxed">
        By continuing, you agree to our{" "}
        <a href="#" className="font-semibold hover:underline" style={{ color: colors.primary }}>
          Terms of Service
        </a>{" "}
        &amp;{" "}
        <a href="#" className="font-semibold hover:underline" style={{ color: colors.primary }}>
          Privacy Policy
        </a>
      </p>
    </form>
  );
}