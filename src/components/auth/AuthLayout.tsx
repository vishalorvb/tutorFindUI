import Image from "next/image";
import { colors, gradients } from "@/config/theme";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left: Illustration Panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12"
        style={{
          background: gradients.darkBg,
        }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-25 blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors.primary}, transparent 70%)` }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-25 blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors.secondary}, transparent 70%)` }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          {/* Illustration image */}
          <div className="relative w-72 h-72 mx-auto mb-8 rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-violet-900/50">
            <Image
              src="/images/auth/login.png"
              alt="Student learning with tutor"
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(15,12,41,0.6), transparent 60%)",
              }}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
            Find the right tutor.{" "}
            <span
              style={{
                background: gradients.gold,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Learn better, faster.
            </span>
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Join thousands of students and tutors on India&apos;s most trusted
            tutoring marketplace.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6">
            <div
              className="px-5 py-3 rounded-xl border border-white/15"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-xl font-extrabold text-white">10,000+</p>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Students
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl border border-white/15"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-xl font-extrabold text-white">2,000+</p>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Tutors
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl border border-white/15"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-xl font-extrabold text-white">4.8★</p>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-slate-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
