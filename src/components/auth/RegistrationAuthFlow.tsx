"use client";

import { useState } from "react";
import type { AuthStep } from "@/types";
import AuthHeader from "./AuthHeader";
import RegistrationForm from "./RegistrationForm";
import OtpVerification from "./OtpVerification";

export default function RegistrationAuthFlow() {
  const [step, setStep] = useState<AuthStep>("form");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  function handleOtpSent(phone: string) {
    setPhoneNumber(phone);
    setOtp(Array(6).fill(""));
    setStep("otp");
  }

  function handleChangePhone() {
    setOtp(Array(6).fill(""));
    setStep("form");
  }

  function handleVerified() {
    setStep("form");
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