"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthStep, RegistrationFormData, VerifyOtpResponse } from "@/types";
import { saveAuthSession } from "@/lib/auth/session";
import AuthHeader from "./AuthHeader";
import RegistrationForm from "./RegistrationForm";
import OtpVerification from "./OtpVerification";

export default function RegistrationAuthFlow() {
  const router = useRouter();
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

  async function handleVerified(result: VerifyOtpResponse) {
    saveAuthSession(result.tokens, result.user);
    router.push(result.redirectTo ?? "/");
  }

  return (
    <>
      <AuthHeader
        title={step === "form" ? "Welcome to TutorFind" : "OTP Verification"}
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