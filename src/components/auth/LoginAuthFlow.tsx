"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CompleteProfileResponse, LoginStep, VerifyOtpResponse } from "@/types";
import { saveAuthSession } from "@/lib/auth/session";
import AuthHeader from "./AuthHeader";
import NewUserForm from "./NewUserForm";
import OtpVerification from "./OtpVerification";
import PhoneInputForm from "./PhoneInputForm";

export default function LoginAuthFlow() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [onboardingToken, setOnboardingToken] = useState<string | undefined>();

  function handleOtpSent(phone: string) {
    setPhoneNumber(phone);
    setOtp(Array(4).fill(""));
    setOnboardingToken(undefined);
    setStep("otp");
  }

  function handleChangePhone() {
    setOtp(Array(4).fill(""));
    setOnboardingToken(undefined);
    setStep("phone");
  }

  async function handleVerified(result: VerifyOtpResponse) {
    if (result.isNewUser) {
      setOnboardingToken(result.onboardingToken);
      setStep("newUser");
      return;
    }

    saveAuthSession(result.tokens, result.user);
    router.push(result.redirectTo ?? "/");
  }

  async function handleProfileCompleted(result: CompleteProfileResponse) {
    saveAuthSession(result.tokens, result.user);
    router.push(result.redirectTo ?? "/");
  }

  const title =
    step === "phone"
      ? "Continue with your phone"
      : step === "otp"
        ? "Enter verification code"
        : "Set up your profile";

  const subtitle =
    step === "phone"
      ? "Log in or create your account to connect with trusted tutors"
      : step === "otp"
        ? "We sent a 4-digit code to your mobile number"
        : "Tell us a bit about yourself to finish your account";

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
        {step === "newUser" && (
          <NewUserForm
            phoneNumber={phoneNumber}
            onboardingToken={onboardingToken}
            onCompleted={handleProfileCompleted}
          />
        )}
      </div>
    </>
  );
}