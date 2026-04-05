"use client";

import { useToast, type Toast } from "./ToastContext";

const styles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
    icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-800",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const s = styles[toast.type] ?? styles.error;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${s.bg} ${s.border} animate-slide-in-right`}
      role="alert"
    >
      <svg className={`w-5 h-5 shrink-0 ${s.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
      </svg>
      <p className={`text-sm font-medium ${s.text} flex-1`}>{toast.message}</p>
      <button onClick={onRemove} className={`shrink-0 ${s.text} hover:opacity-70 transition-opacity`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}
