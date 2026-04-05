export interface LoginFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export type AuthStep = "form" | "otp";

export interface LoginFormProps {
  onOtpSent: (phone: string) => void;
}

export interface OtpVerificationProps {
  phoneNumber: string;
  onChangePhone: () => void;
}
