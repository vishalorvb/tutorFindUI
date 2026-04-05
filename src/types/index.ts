export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface NewUserFormData {
  fullName: string;
  email: string;
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
  onOtpSent: (phone: string) => void;
}

export interface OtpVerificationProps {
  phoneNumber: string;
  otp: string[];
  setOtp: (otp: string[]) => void;
  onChangePhone: () => void;
  onVerified: (isNewUser: boolean) => void;
}

export interface PhoneInputFormProps {
  onOtpSent: (phone: string) => void;
}

export interface NewUserFormProps {
  phoneNumber: string;
}
