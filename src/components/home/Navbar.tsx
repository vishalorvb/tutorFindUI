"use client";
import { useState, useEffect } from "react";
import { getJwt, clearAuthSession } from "@/lib/auth/session";
import { useRouter } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Post Tuition", href: "/post-tuition" },
  { label: "Find Tuition", href: "/tuition" },
  { label: "Find Tutors", href: "/teachers" },
  { label: "Become a Tutor", href: "/become-teacher" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for login/logout events (cross-tab and in-tab)
  useEffect(() => {
    function updateLoginState(e?: Event) {
      if (e?.type === "hometutorly:auth") {
        const hasJwt = !!getJwt();
        setIsLoggedIn(hasJwt);
      } else {
        setIsLoggedIn(!!getJwt());
      }
    }
    updateLoginState();
    window.addEventListener("storage", updateLoginState);
    window.addEventListener("hometutorly:auth", updateLoginState);
    return () => {
      window.removeEventListener("storage", updateLoginState);
      window.removeEventListener("hometutorly:auth", updateLoginState);
    };
  }, []);

  function handleLogout() {
    clearAuthSession();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("hometutorly:auth"));
    router.push("/login");
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2"
            : "py-3"
        }`}
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #172554 100%)" }}
      >
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #06b6d4, #f59e0b)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">
                  <span className="text-white">Home</span>
                  <span className="text-amber-400">Tutorly</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium hidden sm:block">Find Your Perfect Tutor</span>
              </div>
            </Link>

            {/* Desktop Nav — pill-shaped container */}
            <nav className="hidden lg:flex items-center bg-white/[0.07] backdrop-blur-sm rounded-full px-1.5 py-1 border border-white/[0.08]">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
                  prefetch={true}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-slate-300 hover:text-red-400 px-4 py-2 rounded-full hover:bg-red-500/10 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-semibold text-slate-900 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 text-white hover:bg-white/15 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-3.5"}`} />
                <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-400 lg:hidden ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm transition-transform duration-400 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)" }}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <span className="text-lg font-bold">
              <span className="text-white">Home</span>
              <span className="text-amber-400">Tutorly</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.07] text-white hover:bg-white/15 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="px-3 py-3 space-y-0.5">
            {navLinks.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-[15px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-200 group"
                prefetch={true}
              >
                <span className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[11px] font-bold text-amber-400 group-hover:bg-amber-400/10 group-hover:border-amber-400/20 transition-all">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTAs */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 border-t border-white/[0.06] bg-gradient-to-t from-slate-950/80 to-transparent space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-semibold text-white rounded-xl text-center bg-white/[0.07] border border-white/10 hover:bg-white/15 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="block w-full py-2.5 text-sm font-semibold text-slate-400 rounded-xl text-center hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-semibold text-white rounded-xl text-center bg-white/[0.07] border border-white/10 hover:bg-white/15 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold text-slate-900 rounded-xl text-center bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
