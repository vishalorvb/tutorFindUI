import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About Us", href: "/" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Terms of Service", href: "/terms" },
  ],
  students: [
    { label: "Find a Tutor", href: "/teachers" },
    { label: "Post Requirement", href: "/post-tuition" },
    { label: "Browse Tuitions", href: "/tuition" },
  ],
  tutors: [
    { label: "Become a Tutor", href: "/become-teacher" },
    { label: "Tutor Dashboard", href: "/dashboard" },
  ],
  support: [
    { label: "Contact Us", href: "/" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const cities = ["Hyderabad", "Delhi", "Bangalore", "Mumbai", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const subjects = ["Math Tutor", "Physics Tutor", "Chemistry Tutor", "Biology Tutor", "English Tutor", "Coding Tutor"];

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-400">
      {/* Accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #06b6d4 30%, #f43f5e 70%, transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">

        {/* Top row: Brand + Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">

          {/* Brand — spans 2 cols on mobile, 1 on lg */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-base font-bold">
                <span className="text-white">Tutor</span>
                <span className="text-cyan-400">Find</span>
              </span>
            </Link>
            <p className="text-[10px] text-slate-500 leading-snug mb-2 max-w-xs">
              Connecting students with the best home and online tutors across India.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
              ].map((social) => (
                <a key={social.label} href="#" aria-label={social.label}
                  className="w-7 h-7 rounded-md flex items-center justify-center bg-white/5 hover:bg-cyan-500/20 border border-white/8 hover:border-cyan-500/30 transition-all duration-200">
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Company</h6>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Students */}
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">For Students</h6>
            <ul className="space-y-1">
              {footerLinks.students.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors */}
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-rose-400/60 mb-1.5">For Tutors</h6>
            <ul className="space-y-1">
              {footerLinks.tutors.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-slate-400 hover:text-rose-300 transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Support</h6>
            <ul className="space-y-1">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities & Subjects row */}
        <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-slate-600 mb-1.5">Tutors by City</h6>
            <div className="flex flex-wrap gap-1">
              {cities.map((city) => (
                <a key={city} href="/teachers"
                  className="text-[9px] px-2 py-0.5 rounded text-slate-500 hover:text-cyan-300 bg-white/3 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 transition-all duration-150">
                  {city}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-[8px] font-bold uppercase tracking-widest text-slate-600 mb-1.5">Tutors by Subject</h6>
            <div className="flex flex-wrap gap-1">
              {subjects.map((subj) => (
                <a key={subj} href="/teachers"
                  className="text-[9px] px-2 py-0.5 rounded text-slate-500 hover:text-rose-300 bg-white/3 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 transition-all duration-150">
                  {subj}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} HomeTutorly. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[{ label: "Privacy", href: "/terms" }, { label: "Terms", href: "/terms" }].map(({ label, href }) => (
              <a key={label} href={href} className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
