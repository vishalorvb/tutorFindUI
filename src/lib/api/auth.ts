import type {
  CompleteProfilePayload,
  CompleteProfileResponse,
  LoginPayload,
  LoginResponse,
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  UserInfoResponse,
} from "@/types";
import { apiRequest, buildUrl } from "./http";
import { getJwt } from "@/lib/auth/session";

const AUTH_ENDPOINTS = {
  sendOtp: process.env.NEXT_PUBLIC_SEND_OTP_API_URL ?? "/usermanager/sendOtp",
  resendOtp: process.env.NEXT_PUBLIC_RESEND_OTP_API_URL ?? "/usermanager/sendOtp",
  login: process.env.NEXT_PUBLIC_LOGIN_API_URL ?? "/usermanager/login",
  verifyOtp: process.env.NEXT_PUBLIC_VERIFY_OTP_API_URL ?? "/auth/verify-otp",
  completeProfile: process.env.NEXT_PUBLIC_COMPLETE_PROFILE_API_URL ?? "/usermanager/createUser",
  userInfo: "/usermanager/userinfo",
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

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(AUTH_ENDPOINTS.login, {
    method: "POST",
    body: { username: payload.username, password: payload.password },
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

export async function getUserInfo(): Promise<UserInfoResponse> {
  const token = getJwt();
  const response = await fetch(buildUrl(AUTH_ENDPOINTS.userInfo), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status}`);
  }

  return response.json() as Promise<UserInfoResponse>;
}