import Image from "next/image";

const steps = [
  {
    step: "01",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Tell Us Your Requirement",
    description: "Share the subject, class, location, and preferences. Takes less than 2 minutes.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    glow: "rgba(99,102,241,0.25)",
    accent: "#8b5cf6",
    image: "/formfill.jpg",
  },
  {
    step: "02",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Get Matched with Tutors",
    description: "Receive calls or messages from tutors who match your requirements instantly.",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    glow: "rgba(14,165,233,0.25)",
    accent: "#0ea5e9",
    image: "/connect.jpg",
  },
  {
    step: "03",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Book Free Demo Class",
    description: "Try a demo class at zero cost. If satisfied, continue — no pressure ever.",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
    glow: "rgba(16,185,129,0.25)",
    accent: "#10b981",
    image: "/demo.jpg",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8f7ff 0%, #f0f4ff 100%)" }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #c4b5fd, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #a5f3fc, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-violet-200"
            style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-lg mx-auto">
            Finding a great tutor is straightforward — just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[22%] right-[22%] h-0.5 z-0"
            style={{ background: "linear-gradient(90deg, #6366f1, #0ea5e9, #10b981)" }} />

          {steps.map((step, i) => (
            <div key={i} className="relative group z-10">
              <div className="relative rounded-3xl p-8 border border-white/80 hover:border-transparent transition-all duration-400 bg-white hover:shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-3xl"
                  style={{ background: step.gradient }} />

                {/* Step number badge */}
                <div className="absolute top-5 right-5 text-6xl font-black select-none"
                  style={{ color: "rgba(0,0,0,0.04)", letterSpacing: "-4px" }}>
                  {step.step}
                </div>

                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ background: step.gradient, boxShadow: `0 12px 32px ${step.glow}` }}>
                  {step.icon}
                  {/* Step number on icon */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center text-xs font-black shadow-md"
                    style={{ color: step.accent, borderColor: step.accent }}>
                    {i + 1}
                  </div>
                </div>

                {/* Step image */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-5 border border-slate-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: step.gradient }} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a href="#" className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
            Post Your Requirement
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
