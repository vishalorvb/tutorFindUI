import { colors, withAlpha } from "@/config/theme";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AuthHeader({
  title = "Welcome to TutorFind",
  subtitle = "Create your account or log in to get started",
}: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{
          background: `linear-gradient(135deg, ${withAlpha(colors.primary, 0.1)}, ${withAlpha(colors.secondary, 0.1)})`,
          color: colors.primary,
          border: `1px solid ${withAlpha(colors.primary, 0.2)}`,
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        TutorFind
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
