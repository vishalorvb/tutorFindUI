"use client";

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import type { OtpVerificationProps } from "@/types";
import { colors, gradients, shadows, withAlpha } from "@/config/theme";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 30;

async function verifyOtp(phone: string, otp: string): Promise<boolean> {
  // Mock API call — replace with real API
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log(`Verifying OTP ${otp} for +91 ${phone}`);
  return true;
}

async function resendOtp(phone: string): Promise<void> {
  // Mock API call — replace with real API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`OTP resent to +91 ${phone}`);
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return "X".repeat(digits.length - 4) + digits.slice(-4);
}

export default function OtpVerification({ phoneNumber, onChangePhone }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    setError("");

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    setLoading(true);
    try {
      const success = await verifyOtp(phoneNumber, code);
      if (success) {
        setVerified(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendTimer > 0 || resending) return;
    setResending(true);
    try {
      await resendOtp(phoneNumber);
      setResendTimer(RESEND_COOLDOWN);
      setOtp(Array(OTP_LENGTH).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    } finally {
      setResending(false);
    }
  }

  if (verified) {
    return (
      <div className="text-center py-10">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
          style={{ background: gradients.success }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">You&apos;re all set!</h2>
        <p className="text-sm text-slate-500">
          We&apos;ll connect you with the best tutors shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
          style={{ background: `linear-gradient(135deg, ${withAlpha(colors.primary, 0.1)}, ${withAlpha(colors.secondary, 0.1)})` }}
        >
          <svg className="w-7 h-7" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Verify your phone</h2>
        <p className="text-sm text-slate-500">
          Enter the 4-digit code sent to{" "}
          <span className="font-semibold text-slate-700">+91 {maskPhone(phoneNumber)}</span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex items-center justify-center gap-2.5">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`w-12 h-14 text-center text-lg font-bold rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-400 focus:ring-red-200"
                : digit
                  ? "border-violet-400 focus:ring-violet-200"
                  : "border-slate-200 focus:ring-violet-200 focus:border-violet-400"
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-center text-xs text-red-500 font-medium">{error}</p>
      )}

      {/* Verify Button */}
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
            Verifying…
          </span>
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* Resend & Change Phone */}
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm text-slate-500">
          {resendTimer > 0 ? (
            <span>
              Resend code in{" "}
              <span className="font-semibold text-slate-700">{resendTimer}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold hover:underline disabled:opacity-50"
              style={{ color: colors.primary }}
            >
              {resending ? "Sending…" : "Resend OTP"}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onChangePhone}
          className="text-sm font-semibold hover:underline"
          style={{ color: colors.primary }}
        >
          ← Change phone number
        </button>
      </div>
    </form>
  );
}
