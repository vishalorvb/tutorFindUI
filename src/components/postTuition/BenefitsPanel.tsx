import Image from "next/image";
import { colors } from "@/config/theme";

const benefits = [
  { icon: "⚡", text: "Get matched within 30 minutes", color: "bg-amber-50 border-amber-200/60" },
  { icon: "🎓", text: "Verified & experienced tutors", color: "bg-violet-50 border-violet-200/60" },
  { icon: "💬", text: "Direct contact with tutors", color: "bg-blue-50 border-blue-200/60" },
  { icon: "💸", text: "Free to post requirement", color: "bg-emerald-50 border-emerald-200/60" },
];

export default function BenefitsPanel() {
  return (
    <div className="lg:sticky lg:top-24 pt-2 space-y-7">
      {/* Image */}
      <div className="relative max-w-xs mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-slate-200/70 mb-6">
        <Image
          src="/images/post-tuition.png"
          alt="Student finding tutor"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Headline */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug text-center">
        Get the Best Tutors{' '}
        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Near You
        </span>
      </h2>

      {/* Benefits list */}
      <div className="space-y-3">
        {benefits.map((b) => (
          <div
            key={b.text}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${b.color}`}
          >
            <span className="text-lg">{b.icon}</span>
            <span className="text-sm font-medium text-slate-700">{b.text}</span>
          </div>
        ))}
      </div>

      {/* Trust line */}
      <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
        <div className="flex -space-x-2">
          {[colors.primary, colors.secondary, colors.success, colors.gold].map((c, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: c }}
            >
              {["R", "P", "S", "A"][i]}
            </div>
          ))}
        </div>
        <p className="text-xs font-semibold text-slate-600">
          <span className="font-extrabold" style={{ color: colors.primary }}>10,000+</span> students already found tutors
        </p>
      </div>
    </div>
  );
}
