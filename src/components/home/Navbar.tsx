"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/60 border-b border-slate-100"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-violet-300/50 group-hover:shadow-violet-400/60 transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-sm" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Tutor<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Find</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {[
              { label: "How It Works", href: "#how-it-works" },
              { label: "Subjects", href: "#subjects" },
              { label: "Find Tutors", href: "#tutors" },
              { label: "Locations", href: "#locations" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-slate-600 hover:text-violet-700 font-medium rounded-lg hover:bg-violet-50/80 transition-all duration-200 group"
              >
                {item.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors px-4 py-2.5 rounded-xl hover:bg-violet-50/80">
              Log In
            </a>
            <a
              href="/register"
              className="relative text-sm font-bold text-white px-5 py-2.5 rounded-xl overflow-hidden group shadow-lg shadow-violet-300/40 hover:shadow-violet-400/50 transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 border border-slate-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1 bg-white/98 rounded-b-2xl shadow-xl">
            {[
              { label: "How It Works", href: "#how-it-works" },
              { label: "Subjects", href: "#subjects" },
              { label: "Find Tutors", href: "#tutors" },
              { label: "Locations", href: "#locations" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors mx-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {item.label}
              </a>
            ))}
            <div className="pt-3 px-2 border-t border-slate-100 flex flex-col gap-2 mt-1">
              <a href="/login" className="block px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-violet-700 rounded-xl text-center hover:bg-violet-50 transition-colors">
                Log In
              </a>
              <a href="/register" className="block px-4 py-3 text-sm font-bold text-white rounded-xl text-center shadow-lg shadow-violet-300/30"
                style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}>
                Get Started →
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
