import Image from "next/image";
import Link from "next/link";
import HeroSearchBar from "./HeroSearchBar";

export default function HeroSection() {

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1060 40%, #24243e 100%)" }}>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #4f46e5, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Text + Search ── */}
          <div className="text-center lg:text-left">

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 text-amber-300"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse inline-block shadow-lg shadow-emerald-400/60" />
              Trusted by 10,000+ students across India
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              Find the Right Tutor{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Near You
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 260 10" fill="none">
                  <path d="M2 8 C 65 2, 195 2, 258 8" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
                </svg>
              </span>
              {" "}in Minutes
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get matched with verified tutors. Book a{" "}
              <span className="text-emerald-400 font-bold">free demo class</span>{" "}
              and continue only if you love it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link href="/teachers"
                className="relative inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-white overflow-hidden group shadow-2xl shadow-violet-900/50 transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6d28d9 100%)" }}>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="relative z-10">Find a Tutor</span>
              </Link>
              <Link href="/become-teacher"
                className="inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-2xl text-white border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Become a Tutor
              </Link>
            </div>

            {/* Search Bar + Popular Tags (client component) */}
            <HeroSearchBar />
          </div>

          {/* ── Right: Hero Image ── */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md">

              {/* Main image with glass border */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-violet-900/60"
                style={{ backdropFilter: "blur(4px)" }}>
                <Image
                  src="/study.png"
                  alt="Student learning online with a tutor"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20"
                  style={{ background: "linear-gradient(to top, rgba(15,12,41,0.8), transparent)" }} />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 text-xs font-bold px-3 py-2 rounded-xl shadow-xl border border-emerald-400/30"
                style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "white" }}>
                ✓ Verified Tutors
              </div>
              <div className="absolute -bottom-4 -left-4 border border-white/20 rounded-2xl px-4 py-3 text-center shadow-xl float-card"
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}>
                <p className="text-2xl font-black" style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4.8★</p>
                <p className="text-[10px] text-white/60 font-semibold mt-0.5">AVG RATING</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
