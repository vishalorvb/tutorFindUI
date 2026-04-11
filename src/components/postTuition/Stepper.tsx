import { colors } from "@/config/theme";

const steps = ["Requirement", "Details"];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isCompleted
                    ? "bg-emerald-500 text-white"
                    : isActive
                      ? "text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
                style={isActive ? { background: colors.primary } : undefined}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span className={`text-[11px] font-semibold ${
                isActive ? "text-gray-800" : isCompleted ? "text-emerald-600" : "text-gray-400"
              }`}>
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-400"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
