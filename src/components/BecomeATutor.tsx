"use client";
import Image from "next/image";

export default function BecomeATutor() {
  return (
    <section id="become-tutor" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1060 50%, #24243e 100%)" }}>
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4f46e5, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5 border border-violet-400/30"
              style={{ color: "#c4b5fd", background: "rgba(124,58,237,0.15)" }}>
              For Educators
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Join as a Tutor and{" "}
              <span style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Start Earning
              </span>{" "}Today
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: "rgba(196,181,253,0.85)" }}>
              Create your free profile, set your own schedule, and connect with hundreds of students
              looking for tutors in your subject and location.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-10">
              {[
                "Free profile creation — no upfront cost",
                "Get student enquiries directly to your phone",
                "Teach from home or online — your choice",
                "Flexible schedule, set your own fee",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(221,214,254,0.9)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 2px 8px rgba(16,185,129,0.4)" }}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a href="#"
              className="inline-flex items-center gap-2.5 font-black text-slate-900 px-8 py-4 rounded-2xl shadow-2xl transition-all duration-200 hover:scale-[1.03] text-base"
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)", boxShadow: "0 8px 32px rgba(245,158,11,0.4)" }}>
              Start Teaching Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right: Teacher image + stats overlay */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/teacher.jpg"
                alt="Become a tutor on TutorFind"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-3xl"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(to top, rgba(15,12,41,0.7) 0%, transparent 50%)" }} />
            </div>

            {/* Stats overlay grid */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
              {[
                { value: "₹25K+", label: "Avg Monthly Earning", gradient: "linear-gradient(135deg, #f59e0b, #f97316)" },
                { value: "2,000+", label: "Active Tutors", gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)" },
                { value: "10K+", label: "Students Connected", gradient: "linear-gradient(135deg, #10b981, #0284c7)" },
                { value: "Free", label: "Registration", gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)" },
              ].map((stat, i) => (
                <div key={i}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-lg font-black" style={{ background: stat.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold" style={{ color: "rgba(196,181,253,0.75)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
