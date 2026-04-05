"use client";

import { useState } from "react";
import type { AuthStep } from "@/types";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";
import OtpVerification from "./OtpVerification";

export default function LoginAuthFlow() {
  const [step, setStep] = useState<AuthStep>("form");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handleOtpSent(phone: string) {
    setPhoneNumber(phone);
    setStep("otp");
  }

  function handleChangePhone() {
    setStep("form");
  }

  return (
    <>
      <AuthHeader
        title={step === "form" ? "Welcome to TutorFind" : "OTP Verification"}
        subtitle={
          step === "form"
            ? "Create your account or log in to get started"
            : "One last step to verify your identity"
        }
      />
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-7 sm:p-9">
        {step === "form" ? (
          <LoginForm onOtpSent={handleOtpSent} />
        ) : (
          <OtpVerification phoneNumber={phoneNumber} onChangePhone={handleChangePhone} />
        )}
      </div>
    </>
  );
}
