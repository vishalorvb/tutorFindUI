"use client";

import React, { useState } from "react";
import DashboardChips, { SectionKey } from "@/components/dashboard/DashboardChips";
import PreviewList from "@/components/dashboard/PreviewList";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 space-y-3">

        {/* Section Cards + Preview List */}
        <div>
          <DashboardChips activeSection={activeSection} onChange={setActiveSection} />
          <PreviewList activeSection={activeSection} />
        </div>

      </div>
    </div>
  );
}
