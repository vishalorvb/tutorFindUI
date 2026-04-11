"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthStep, RegistrationFormData } from "@/types";
import { login } from "@/lib/api/auth";
import { saveJwt } from "@/lib/auth/session";
import { getApiErrorMessage } from "@/lib/api/http";
import { useToast } from "@/components/toast/ToastContext";
import AuthHeader from "./AuthHeader";
import RegistrationForm from "./RegistrationForm";
import OtpVerification from "./OtpVerification";

export default function RegistrationAuthFlow() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<AuthStep>("form");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);

  function handleOtpSent(formData: RegistrationFormData) {
    setPhoneNumber(formData.phone);
    setRegistrationData(formData);
    setOtp(Array(4).fill(""));
    setStep("otp");
  }

  function handleChangePhone() {
    setOtp(Array(4).fill(""));
    setRegistrationData(null);
    setStep("form");
  }

  async function handleVerified(otpCode: string) {
    try {
      const result = await login({
        username: phoneNumber,
        password: otpCode,
      });
      const jwt = result?.data?.access ?? result?.access_token;
      if (!jwt) {
        showToast("Login failed: No access token returned.", "error");
        throw new Error("No access token in login response");
      }
      saveJwt(jwt);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("hometutorly:auth"));
      }
      showToast("Registration successful!", "success");
      router.push("/");
    } catch (err) {
      const msg = getApiErrorMessage(err, "Login failed. Please try again.");
      showToast(msg);
      throw err;
    }
  }

  return (
    <>
      <AuthHeader
        title={step === "form" ? "Welcome to HomeTutorly" : "OTP Verification"}
        subtitle={
          step === "form"
            ? "Create your account to get started"
            : "One last step to verify your identity"
        }
      />
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-7 sm:p-9">
        {step === "form" ? (
          <RegistrationForm onOtpSent={handleOtpSent} />
        ) : (
          <OtpVerification
            phoneNumber={phoneNumber}
            otp={otp}
            setOtp={setOtp}
            onChangePhone={handleChangePhone}
            onVerified={handleVerified}
          />
        )}
      </div>
    </>
  );
}