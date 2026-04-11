"use client";

import React, { useEffect, useState } from "react";
import type { SectionKey } from "./DashboardChips";
import type { UserInfo } from "@/types";
import { getUserInfo } from "@/lib/api/auth";
import TeacherList from "./TeacherList";
import TuitionList from "./TuitionList";

interface ProfileProps {
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

export default function Profile({ activeSection }: ProfileProps) {
  if (activeSection === "profile") {
    return <ProfileSection />;
  }

  if (activeSection === "profiles") {
    return <TeacherList />;
  }

  return <TuitionList />;
}

