"use client";

import { useState, type FormEvent } from "react";
import type { RegistrationFormData, FormErrors, RegistrationFormProps } from "@/types";
import { colors, gradients, shadows } from "@/config/theme";
import { completeProfile, normalizePhoneNumber, sendOtp } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/http";
import { useToast } from "@/components/toast/ToastContext";

function validate(data: RegistrationFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(normalizePhoneNumber(data.phone))) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  return errors;
}

export default function RegistrationForm({ onOtpSent }: RegistrationFormProps) {
  const [form, setForm] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  function handleChange(field: keyof RegistrationFormData, value: string) {
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
      const payload = {
        ...form,
        phone: normalizePhoneNumber(form.phone),
      };
      await completeProfile({
        phoneNumber: payload.phone,
        fullName: payload.fullName,
        email: payload.email,
      });
      // OTP is sent by the createUser backend — no separate sendOtp call needed
      onOtpSent(payload);
    } catch (submitError) {
      const msg = getApiErrorMessage(submitError, "Unable to register. Please try again.");
      setErrors((prev) => ({
        ...prev,
        phone: msg,
      }));
      showToast(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
        {errors.fullName && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email Address
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
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
            +91
          </span>
          <input
            id="phone"
            type="tel"
            placeholder="98765 43210"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.phone
                ? "border-red-400 focus:ring-red-200"
                : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone}</p>
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
            Sending OTP…
          </span>
        ) : (
          "Continue"
        )}
      </button>

      <p className="text-center text-xs text-slate-400 leading-relaxed pt-2">
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