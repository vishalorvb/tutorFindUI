"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginStep } from "@/types";
import AuthHeader from "./AuthHeader";
import NewUserForm from "./NewUserForm";
import OtpVerification from "./OtpVerification";
import PhoneInputForm from "./PhoneInputForm";

export default function LoginAuthFlow() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  function handleOtpSent(phone: string) {
    setPhoneNumber(phone);
    setOtp(Array(6).fill(""));
    setStep("otp");
  }

  function handleChangePhone() {
    setOtp(Array(6).fill(""));
    setStep("phone");
  }

  function handleVerified(isNewUser: boolean) {
    if (isNewUser) {
      setStep("newUser");
      return;
    }

    router.push("/");
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
        ? "We sent a 6-digit code to your mobile number"
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
        {step === "newUser" && <NewUserForm phoneNumber={phoneNumber} />}
      </div>
    </>
  );
}