export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
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

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type?: string;
  [key: string]: unknown;
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
export type LoginStep = "phone" | "otp";

export interface RegistrationFormProps {
  onOtpSent: (formData: RegistrationFormData) => void;
}

export interface OtpVerificationProps {
  phoneNumber: string;
  otp: string[];
  setOtp: (otp: string[]) => void;
  onChangePhone: () => void;
  onVerified: (otpCode: string) => void | Promise<void>;
}

export interface PhoneInputFormProps {
  onOtpSent: (phone: string) => void;
}

// ─── Tuition Types ───

export type TeachingMode = "online" | "home";

export interface Tuition {
  id: number;
  subject: string;
  course: string;
  description?: string;
  teaching_mode: TeachingMode;
  fee?: number;
  locality?: string;
  city?: string;
  pincode?: string;
  posted_date: string;
  verify: boolean;
  slug: string;
  photo?: string;
  unlocks: number;
}

export interface TuitionFilters {
  search: string;
  location: string;
  subject: string;
  course: string;
  teachingMode: TeachingMode | "";
  sortBy: "latest" | "fee-high-low";
}

// ─── Post Tuition Types ───

export interface PostTuitionFormData {
  // Step 1
  subject: string;
  course: string;
  teachingMode: TeachingMode | "both" | "";
  // Step 2
  description: string;
  fee: string;
  locality: string;
  pincode: string;
  studentName: string;
  phone: string;
  photo: File | null;
}

export interface StepOneFormProps {
  formData: PostTuitionFormData;
  onChange: (field: keyof PostTuitionFormData, value: string) => void;
  onNext: () => void;
}

export interface StepTwoFormProps {
  formData: PostTuitionFormData;
  onChange: (field: keyof PostTuitionFormData, value: string | File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
}
