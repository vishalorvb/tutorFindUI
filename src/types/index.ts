export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface NewUserFormData {
  fullName: string;
  email: string;
}

export interface AuthUser {
  id: string;
  fullName?: string;
  email?: string;
  phoneNumber: string;
  role?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface SendOtpPayload {
  phoneNumber: string;
  countryCode?: string;
}

export interface SendOtpResponse {
  message?: string;
  requestId?: string;
  retryAfterSeconds?: number;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  isNewUser: boolean;
  onboardingToken?: string;
  redirectTo?: string;
  tokens?: AuthTokens;
  user?: AuthUser;
}

export interface CompleteProfilePayload {
  phoneNumber: string;
  fullName: string;
  email?: string;
  onboardingToken?: string;
}

export interface CompleteProfileResponse {
  message?: string;
  redirectTo?: string;
  tokens?: AuthTokens;
  user?: AuthUser;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  otp?: string;
}

export type AuthStep = "form" | "otp";
export type LoginStep = "phone" | "otp" | "newUser";

export interface RegistrationFormProps {
  onOtpSent: (formData: RegistrationFormData) => void;
}

export interface OtpVerificationProps {
  phoneNumber: string;
  otp: string[];
  setOtp: (otp: string[]) => void;
  onChangePhone: () => void;
  onVerified: (result: VerifyOtpResponse) => void | Promise<void>;
}

export interface PhoneInputFormProps {
  onOtpSent: (phone: string) => void;
}

export interface NewUserFormProps {
  phoneNumber: string;
  onboardingToken?: string;
  onCompleted: (result: CompleteProfileResponse) => void | Promise<void>;
}
