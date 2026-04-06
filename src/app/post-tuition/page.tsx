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
        <div className="max-w-xl mx-auto text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Requirement Posted!
          </h1>
          <p className="text-slate-500 mb-8">
            We&apos;ll connect you with verified tutors for <strong className="text-slate-700">{formData.subject}</strong> ({formData.course}) shortly.
          </p>
          <a
            href="/tuition"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-violet-300/40"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            Browse Tuitions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </PostTuitionLayout>
    );
  }

  return (
    <PostTuitionLayout>
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Post Tuition Requirement
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">Fill in your requirement and get matched with verified tutors.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Benefits — left side, hidden on mobile */}
        <div className="hidden lg:block">
          <BenefitsPanel />
        </div>

        {/* Form section — right side */}
        <div>
          <div className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-lg sm:shadow-slate-200/70 border-0 sm:border sm:border-slate-100 -mx-4 sm:mx-0 px-4 sm:px-8 py-6 sm:py-8">
            <Stepper currentStep={step} />

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                {error}
              </div>
            )}

            {step === 1 && (
              <StepOneForm
                formData={formData}
                onChange={handleChange}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <StepTwoForm
                formData={formData}
                onChange={handleChange}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile benefits — below form */}
      <div className="lg:hidden mt-8">
        <BenefitsPanel />
      </div>

      {/* Bottom spacer for mobile */}
      <div className="h-4 lg:hidden" />
    </PostTuitionLayout>
  );
}
