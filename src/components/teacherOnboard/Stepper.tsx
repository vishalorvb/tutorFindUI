"use client";

const steps = ["Teaching Info", "Profile Details"];

export default function Stepper({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`w-10 h-0.5 ${
                  done ? "bg-violet-600" : "bg-gray-200"
                }`}
              />
            )}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                done
                  ? "bg-violet-600 text-white"
                  : active
                  ? "bg-violet-600 text-white ring-4 ring-violet-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {done ? "✓" : step}
            </div>
            <span
              className={`text-sm font-medium ${
                active ? "text-violet-700" : done ? "text-violet-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
