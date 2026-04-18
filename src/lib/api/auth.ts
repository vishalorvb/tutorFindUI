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
import api from "./http";

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
  const { data } = await api.post(AUTH_ENDPOINTS.sendOtp, { phone_number: payload.phoneNumber });
  return data;
}

export async function resendOtp(payload: SendOtpPayload): Promise<SendOtpResponse> {
  const { data } = await api.post(AUTH_ENDPOINTS.resendOtp, { phone_number: payload.phoneNumber });
  return data;
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const { data } = await api.post(AUTH_ENDPOINTS.verifyOtp, payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post(AUTH_ENDPOINTS.login, { username: payload.username, password: payload.password });
  return data;
}

export async function completeProfile(payload: CompleteProfilePayload): Promise<CompleteProfileResponse> {
  const { data } = await api.post(AUTH_ENDPOINTS.completeProfile, {
    full_name: payload.fullName,
    email: payload.email,
    phone_number: normalizePhoneNumber(payload.phoneNumber),
  });
  return data;
}

export async function getUserInfo(): Promise<UserInfoResponse> {
  const { data } = await api.get(AUTH_ENDPOINTS.userInfo);
  return data;
}