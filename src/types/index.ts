export interface RegistrationFormData {
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

export interface RegistrationFormProps {
  onOtpSent: (phone: string) => void;
}

export interface OtpVerificationProps {
  phoneNumber: string;
  onChangePhone: () => void;
}

export interface PhoneInputFormProps {
  onOtpSent: (phone: string) => void;
}
