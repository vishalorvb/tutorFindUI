import type {
  CompleteProfilePayload,
  CompleteProfileResponse,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/types";
import { apiRequest } from "./http";

const AUTH_ENDPOINTS = {
  sendOtp: process.env.NEXT_PUBLIC_SEND_OTP_API_URL ?? "http://127.0.0.1:8000/usermanager/sendOtp",
  resendOtp: process.env.NEXT_PUBLIC_RESEND_OTP_API_URL ?? "http://127.0.0.1:8000/usermanager/sendOtp",
  verifyOtp: process.env.NEXT_PUBLIC_VERIFY_OTP_API_URL ?? "/auth/verify-otp",
  completeProfile:
    process.env.NEXT_PUBLIC_COMPLETE_PROFILE_API_URL ??
    "http://127.0.0.1:8000/usermanager/createUser",
} as const;

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export async function sendOtp(payload: SendOtpPayload): Promise<SendOtpResponse> {
  return apiRequest<SendOtpResponse>(AUTH_ENDPOINTS.sendOtp, {
    method: "POST",
    body: { phone_number: payload.phoneNumber },
  });
}

export async function resendOtp(payload: SendOtpPayload): Promise<SendOtpResponse> {
  return apiRequest<SendOtpResponse>(AUTH_ENDPOINTS.resendOtp, {
    method: "POST",
    body: { phone_number: payload.phoneNumber },
  });
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  return apiRequest<VerifyOtpResponse>(AUTH_ENDPOINTS.verifyOtp, {
    method: "POST",
    body: payload,
  });
}

export async function completeProfile(payload: CompleteProfilePayload): Promise<CompleteProfileResponse> {
  return apiRequest<CompleteProfileResponse>(AUTH_ENDPOINTS.completeProfile, {
    method: "POST",
    body: {
      full_name: payload.fullName,
      email: payload.email,
      phone_number: normalizePhoneNumber(payload.phoneNumber),
    },
  });
}