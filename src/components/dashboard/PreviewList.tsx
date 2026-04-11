"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SectionKey } from "./DashboardChips";
import type { UserInfo, Teacher, Tuition } from "@/types";
import { getUserInfo } from "@/lib/api/auth";
import { getMyTeacherProfiles } from "@/lib/api/teacher";
import { getMyPostedTuitions } from "@/lib/api/tuition";

interface PreviewListProps {
  activeSection: SectionKey;
}

function ProfileSection() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserInfo()
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-3 p-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-400 text-center">
        Loading...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mt-3 p-3 bg-white rounded-xl border border-gray-100 text-xs text-red-400 text-center">
        {error ?? "No profile data"}
      </div>
    );
  }

  const initials = user.Full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mt-3">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Profile header with gradient */}
        <div className="h-16 bg-gradient-to-r from-blue-500 to-violet-500 relative">
          <div className="absolute -bottom-5 left-4">
            <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-7 px-4 pb-3">
          {/* Name row */}
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-gray-900">{user.Full_name}</h3>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              user.is_teacher
                ? "bg-blue-50 text-blue-600"
                : "bg-purple-50 text-purple-600"
            }`}>
              {user.is_teacher ? "Teacher" : "Student"}
            </span>
          </div>

          {/* Info rows */}
          <div className="mt-2.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{user.email}</span>
              {!user.is_email_varified ? (
                <span className="text-[10px] text-red-500 font-medium shrink-0">Not Verified</span>
              ) : (
                <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{user.phone_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeachersSection() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyTeacherProfiles()
      .then(setTeachers)
      .catch(() => setError("Failed to load teacher profiles"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-3 space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-2.5 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 p-4 bg-white rounded-2xl border border-red-100 text-xs text-red-400 text-center">
        {error}
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="mt-3 p-6 bg-white rounded-2xl border border-gray-100 text-center">
        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">No teacher profiles yet</p>
        <button
          onClick={() => router.push("/become-teacher")}
          className="mt-2 text-xs text-blue-600 font-medium"
        >
          Create your first profile →
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2.5">
      {teachers.map((t) => (
        <div
          key={t.id}
          onClick={() => router.push(`/teachers/${t.slug}`)}
          className="group p-3.5 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-200"
        >
          <div className="flex gap-3">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              t.teaching_mode === "online"
                ? "bg-emerald-50"
                : "bg-amber-50"
            }`}>
              <svg className={`w-5 h-5 ${
                t.teaching_mode === "online" ? "text-emerald-500" : "text-amber-500"
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {t.teaching_mode === "online" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                )}
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-gray-900 capitalize truncate">{t.subject} Teacher</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${
                  t.teaching_mode === "online"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}>
                  {t.teaching_mode}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] text-gray-400">{t.location}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span className="text-[11px] text-gray-400">{t.experience} yrs</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                <span className="text-[11px] font-medium text-gray-600">₹{t.fee}/hr</span>
              </div>
            </div>

            {/* Arrow */}
            <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function TuitionsSection() {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyPostedTuitions()
      .then(setTuitions)
      .catch(() => setError("Failed to load posted tuitions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-3 space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-2.5 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 p-4 bg-white rounded-2xl border border-red-100 text-xs text-red-400 text-center">
        {error}
      </div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="mt-3 p-6 bg-white rounded-2xl border border-gray-100 text-center">
        <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-xs text-gray-400">No tuitions posted yet</p>
        <button
          onClick={() => router.push("/post-tuition")}
          className="mt-2 text-xs text-blue-600 font-medium"
        >
          Post your first tuition →
        </button>
      </div>
    );
  }

  const modeConfig: Record<string, { bg: string; text: string; icon: string }> = {
    online: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "text-emerald-500" },
    home: { bg: "bg-violet-50", text: "text-violet-600", icon: "text-violet-500" },
    both: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
  };

  return (
    <div className="mt-3 space-y-2.5">
      {tuitions.map((t) => {
        const mode = modeConfig[t.teaching_mode] ?? modeConfig.both;
        return (
          <div
            key={t.id}
            onClick={() => router.push(`/tuition/${t.slug}`)}
            className="group p-3.5 bg-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-200"
          >
            <div className="flex gap-3">
              {/* Subject icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${mode.bg}`}>
                <svg className={`w-5 h-5 ${mode.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-gray-900 truncate">{t.subject} – {t.course}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${mode.bg} ${mode.text}`}>
                    {t.teaching_mode}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] text-gray-400 truncate">
                    {t.locality}{t.pincode_info?.District ? `, ${t.pincode_info.District}` : ""}
                  </span>
                  <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                  <span className="text-[11px] font-medium text-gray-600 shrink-0">₹{t.fee}</span>
                  {t.status && (
                    <>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                      <span className="flex items-center gap-0.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-[10px] text-green-600">Active</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PreviewList({ activeSection }: PreviewListProps) {
  const router = useRouter();

  if (activeSection === "profile") {
    return <ProfileSection />;
  }

  if (activeSection === "profiles") {
    return <TeachersSection />;
  }

  return <TuitionsSection />;
}

