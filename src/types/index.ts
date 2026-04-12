export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface UserInfo {
  id: number;
  phone_number: string;
  Full_name: string;
  email: string;
  credit_points: number;
  profilepic: string | null;
  is_teacher: boolean;
  is_email_varified: boolean;
  role: number;
}

export interface UserInfoResponse {
  data: UserInfo;
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
  data?: {
    access?: string;
    [key: string]: unknown;
  };
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
  terms?: string;
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

export interface NewUserFormData {
  fullName: string;
  email: string;
}

export interface NewUserFormProps {
  phoneNumber: string;
  onboardingToken?: string;
  onCompleted: (result: CompleteProfileResponse) => void | Promise<void>;
}

// ─── Tuition Types ───

export type TeachingMode = "online" | "home";

export interface Tuition {
  id: number;
  subject: string;
  course: string;
  description?: string;
  teaching_mode: TeachingMode;
  fee?: number | string;
  locality?: string;
  city?: string;
  pincode?: number | string;
  posted_date: string;
  verify: boolean;
  slug: string;
  photo?: string;
  unlocks: number;
  student_name?: string;
  phone_number?: string;
  pincode_info?: {
    Pincode?: number;
    Devision?: string;
    Region?: string;
    Circle?: string;
    Taluk?: string;
    District?: string;
    State?: string;
  };
  status?: boolean;
}

export interface TuitionFilters {
  search: string;
  location: string;
  subject: string;
  course: string;
  teachingMode: TeachingMode | "";
  sortBy: "latest" | "fee-high-low";
  feeMin?: string;
  feeMax?: string;
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

// ─── Teacher Onboarding Types ───

export interface TeacherFormData {
  teacher_name: string;
  gender: string;
  age: string;
  subject: string[];
  classes: string[];
  mode: string;
  experience: string;
  qualification: string;
  about: string;
  fee: string;
  location: string;
  pincode: string;
  photo: File | null;
}

export interface TeacherStepOneProps {
  formData: TeacherFormData;
  onChange: (field: keyof TeacherFormData, value: string | string[]) => void;
  onNext: () => void;
}

export interface TeacherStepTwoProps {
  formData: TeacherFormData;
  onChange: (field: keyof TeacherFormData, value: string | File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

// ─── Teacher Listing Types ───

export interface Teacher {
  id: number;
  name: string;
  phone_number: string;
  gender: string;
  experience: number | string;
  location: string;
  qualification: string;
  subject: string;
  classes: string;
  about: string;
  teaching_mode: string;
  pincode: number;
  age: number;
  fee: string;
  photo: string | null;
  slug: string;
}
