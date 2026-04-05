"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginStep, LoginResponse } from "@/types";
import { login } from "@/lib/api/auth";
import { saveJwt } from "@/lib/auth/session";
import { getApiErrorMessage } from "@/lib/api/http";
import { useToast } from "@/components/toast/ToastContext";
import AuthHeader from "./AuthHeader";
import OtpVerification from "./OtpVerification";
import PhoneInputForm from "./PhoneInputForm";

export default function LoginAuthFlow() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  function handleOtpSent(phone: string) {
    setPhoneNumber(phone);
    setOtp(Array(4).fill(""));
    setStep("otp");
  }

  function handleChangePhone() {
    setOtp(Array(4).fill(""));
    setStep("phone");
  }

  async function handleVerified(otpCode: string) {
    try {
      const result: LoginResponse = await login({
        username: phoneNumber,
        password: otpCode,
      });
      saveJwt(result.access_token);
      showToast("Login successful!", "success");
      router.push("/");
    } catch (err) {
      const msg = getApiErrorMessage(err, "Login failed. Please try again.");
      showToast(msg);
      throw err;
    }
  }

  const title =
    step === "phone"
      ? "Continue with your phone"
      : "Enter verification code";

  const subtitle =
    step === "phone"
      ? "Log in or create your account to connect with trusted tutors"
      : "We sent a 4-digit code to your mobile number";

  return (
    <>
      <AuthHeader title={title} subtitle={subtitle} />
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-7 sm:p-9">
        {step === "phone" && <PhoneInputForm onOtpSent={handleOtpSent} />}
        {step === "otp" && (
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