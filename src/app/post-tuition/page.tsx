"use client";

import { useState } from "react";
import type { PostTuitionFormData } from "@/types";
import PostTuitionLayout from "@/components/postTuition/PostTuitionLayout";
import Stepper from "@/components/postTuition/Stepper";
import StepOneForm from "@/components/postTuition/StepOneForm";
import StepTwoForm from "@/components/postTuition/StepTwoForm";
import BenefitsPanel from "@/components/postTuition/BenefitsPanel";
import { createTuition } from "@/lib/api/tuition";
import { getJwt } from "@/lib/auth/session";

const INITIAL_DATA: PostTuitionFormData = {
  subject: "",
  course: "",
  teachingMode: "",
  description: "",
  fee: "",
  locality: "",
  pincode: "",
  studentName: "",
  phone: "",
  photo: null,
};

export default function PostTuitionPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PostTuitionFormData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof PostTuitionFormData, value: string | File | null) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setError(null);
    try {
      const jwt = getJwt();
      if (!jwt) {
        setError("You must be logged in to post a tuition requirement.");
        return;
      }
      await createTuition({
        student_name: formData.studentName,
        student_phone_number: formData.phone,
        course: formData.course,
        subject: formData.subject,
        description: formData.description,
        fee: formData.fee,
        mode: formData.teachingMode,
        pincode: formData.pincode,
        locality: formData.locality,
        photo: formData.photo,
      }, jwt);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to post tuition requirement.");
    }
  }

  if (submitted) {
    return (
      <PostTuitionLayout>
        <div className="text-center py-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-1.5">Requirement Posted!</h1>
          <p className="text-[13px] text-gray-500 mb-5">
            We&apos;ll connect you with tutors for <strong className="text-gray-700">{formData.subject}</strong> ({formData.course}).
          </p>
          <a
            href="/tuition"
            className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg bg-violet-600 text-white text-[13px] font-semibold hover:bg-violet-700 transition"
          >
            Browse Tuitions →
          </a>
        </div>
      </PostTuitionLayout>
    );
  }

  return (
    <PostTuitionLayout>
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-[15px] font-bold text-gray-900">Post Tuition Requirement</h1>
        <p className="text-[11px] text-gray-500 mt-0.5">Get matched with verified tutors near you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Benefits — left side, hidden on mobile */}
        <div className="hidden lg:block">
          <BenefitsPanel />
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Stepper currentStep={step} />

          {error && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[12px] font-medium">
              {error}
            </div>
          )}

          {step === 1 && (
            <StepOneForm formData={formData} onChange={handleChange} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepTwoForm formData={formData} onChange={handleChange} onBack={() => setStep(1)} onSubmit={handleSubmit} />
          )}
        </div>
      </div>

      {/* Mobile benefits — below form */}
      <div className="lg:hidden mt-4">
        <BenefitsPanel />
      </div>
    </PostTuitionLayout>
  );
}
