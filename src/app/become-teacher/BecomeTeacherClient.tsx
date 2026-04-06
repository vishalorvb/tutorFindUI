"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeacherLayout from "@/components/teacherOnboard/TeacherLayout";
import Stepper from "@/components/teacherOnboard/Stepper";
import StepOneForm from "@/components/teacherOnboard/StepOneForm";
import StepTwoForm from "@/components/teacherOnboard/StepTwoForm";
import BenefitsPanel from "@/components/teacherOnboard/BenefitsPanel";
import { createTeacher } from "@/lib/api/teacher";
import { getJwt } from "@/lib/auth/session";
import type { TeacherFormData } from "@/types";

const initialData: TeacherFormData = {
  teacher_name: "",
  gender: "",
  age: "",
  subject: [],
  classes: [],
  mode: "",
  experience: "",
  qualification: "",
  about: "",
  fee: "",
  location: "",
  pincode: "",
  photo: null,
};

export default function BecomeTeacherClient() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<TeacherFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field: keyof TeacherFormData, value: string | string[] | File | null) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const jwt = getJwt();
      if (!jwt) {
        router.push("/login");
        return;
      }
      await createTeacher(formData, jwt);
      router.push("/?teacher=registered");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <TeacherLayout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <Stepper current={step} />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {step === 1 ? (
            <StepOneForm
              formData={formData}
              onChange={handleChange}
              onNext={() => setStep(2)}
            />
          ) : (
            <StepTwoForm
              formData={formData}
              onChange={handleChange}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>

        {/* Benefits Column */}
        <div className="lg:col-span-2 hidden lg:block">
          <BenefitsPanel />
        </div>
      </div>
    </TeacherLayout>
  );
}
