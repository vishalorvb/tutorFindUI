import { colors } from "@/config/theme";

const steps = ["Requirement", "Details"];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={label} className="flex items-center gap-3 flex-1">
            {/* Step circle */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0 ${
                  isCompleted
                    ? "text-white shadow-lg shadow-emerald-200/60"
                    : isActive
                      ? "text-white shadow-lg shadow-violet-300/60"
                      : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                }`}
                style={
                  isCompleted
                    ? { background: `linear-gradient(135deg, ${colors.success}, ${colors.successLight})` }
                    : isActive
                      ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }
                      : undefined
                }
              >
                {isCompleted ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-sm font-semibold transition-colors ${
                  isActive ? "text-slate-900" : isCompleted ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: isCompleted ? "100%" : "0%",
                    background: `linear-gradient(90deg, ${colors.success}, ${colors.successLight})`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
