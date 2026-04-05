import { colors } from "@/config/theme";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
      <svg
        className="w-16 h-16 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: colors.primaryLighter }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No tuitions found</h3>
      <p className="text-sm text-slate-500">Try changing filters or search for a different subject</p>
    </div>
  );
}
