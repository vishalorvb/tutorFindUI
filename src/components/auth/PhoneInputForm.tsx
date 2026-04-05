"use client";

import { useState, type FormEvent } from "react";
import type { PhoneInputFormProps } from "@/types";
import { colors, gradients, shadows } from "@/config/theme";
import { normalizePhoneNumber, sendOtp } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/http";

function validatePhone(phone: string): string | null {
  const digits = normalizePhoneNumber(phone);
  if (!digits) return "Phone number is required";
  if (!/^\d{10}$/.test(digits)) return "Enter a valid 10-digit phone number";
  return null;
}

export default function PhoneInputForm({ onOtpSent }: PhoneInputFormProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizePhoneNumber(phone);
      await sendOtp({ phoneNumber: normalizedPhone });
      onOtpSent(normalizedPhone);
    } catch (submitError) {
      setError(getApiErrorMessage(submitError, "Unable to send OTP. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-semibold">
            +91
          </span>
          <input
            id="phone"
            type="tel"
            autoFocus
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError("");
            }}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-400 focus:ring-red-200"
                : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
            }`}
          />
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
        ) : (
          <p className="mt-1.5 text-xs text-slate-400">We&apos;ll send you a verification code</p>
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
