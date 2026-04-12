import Link from "next/link";
import HeroSearchBar from "./HeroSearchBar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b1120]">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-[-8%] w-125 h-125 rounded-full opacity-[0.18] blur-3xl"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "radial-gradient(circle, #f43f5e, transparent 70%)" }} />
        <div className="absolute top-[30%] left-[40%] w-75 h-75 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-14 sm:pb-20 md:pt-18 md:pb-24">

        {/* Stats chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 mb-4 sm:mb-8">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-slate-400">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal-500/15 inline-flex items-center justify-center">
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-white font-medium">2,000+</span> Tutors
          </div>
          <div className="w-px h-3 sm:h-3.5 bg-slate-700/80" />
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-slate-400">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500/15 inline-flex items-center justify-center">
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-white font-medium">4.8</span> Rating
          </div>
          <div className="w-px h-3 sm:h-3.5 bg-slate-700/80" />
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-slate-400">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-violet-500/15 inline-flex items-center justify-center">
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="text-white font-medium">50+</span> Subjects
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-3 sm:mb-6">
          <h1 className="text-[1.35rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight tracking-tight">
            Find the Right Tutor{" "}
            <span className="bg-linear-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Near You
            </span>
            {" "}in Minutes
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            Get matched with verified tutors. Book a{" "}
            <span className="text-teal-400 font-semibold">free demo class</span>{" "}
            and continue only if you love it.
          </p>
        </div>

        {/* Search Bar + Popular Tags (client component) */}
        <HeroSearchBar />

        {/* CTA row */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-7">
          <Link href="/teachers"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-white shadow-md shadow-rose-500/20 transition-all duration-200 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}>
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Tutor
          </Link>
          <Link href="/become-teacher"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white transition-all duration-200">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Become a Tutor
          </Link>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 L0 25 Q360 5 720 25 Q1080 45 1440 25 L1440 40 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
