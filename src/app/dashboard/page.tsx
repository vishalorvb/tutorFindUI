"use client";

import React, { useState } from "react";
import DashboardChips, { SectionKey } from "@/components/dashboard/DashboardChips";
import Profile from "@/components/dashboard/Profile";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 space-y-3">

        <div>
          <DashboardChips activeSection={activeSection} onChange={setActiveSection} />
          <Profile activeSection={activeSection} />
        </div>

      </div>
    </div>
  );
}
