"use client";
import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  students: [
    { label: "Find a Tutor", href: "#subjects" },
    { label: "Post Requirement", href: "#" },
    { label: "Online Tutors", href: "#" },
    { label: "Home Tutors", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  tutors: [
    { label: "Become a Tutor", href: "#become-tutor" },
    { label: "Tutor Dashboard", href: "#" },
    { label: "Tutor Resources", href: "#" },
    { label: "Safety Guidelines", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const cities = ["Hyderabad", "Delhi", "Bangalore", "Mumbai", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const subjects = ["Math Tutor", "Physics Tutor", "Chemistry Tutor", "Biology Tutor", "English Tutor", "Coding Tutor"];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0f0c29 0%, #1a1060 100%)" }}>
      {/* Top gradient accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #7c3aed 30%, #4f46e5 50%, #f59e0b 70%, transparent)" }} />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-black">
                <span className="text-white">Tutor</span>
                <span style={{ background: "linear-gradient(90deg, #a78bfa, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Find</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(196,181,253,0.65)" }}>
              Connecting students with the best home and online tutors across India.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
              ].map((social) => (
                <a key={social.label} href="#" aria-label={social.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #7c3aed, #4f46e5)"; (e.currentTarget as HTMLElement).style.border = "1px solid transparent"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.1)"; }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4"
              style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(196,181,253,0.6)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#c4b5fd")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(196,181,253,0.6)")}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4"
              style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              For Students
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.students.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(196,181,253,0.6)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#c4b5fd")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(196,181,253,0.6)")}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Tutors */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4"
              style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              For Tutors
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.tutors.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(196,181,253,0.6)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#fbbf24")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(196,181,253,0.6)")}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4"
              style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(196,181,253,0.6)" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "#c4b5fd")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(196,181,253,0.6)")}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Cities & Subjects */}
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(196,181,253,0.4)" }}>Tutors by City</h5>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <a key={city} href="#"
                    className="text-xs px-2.5 py-1 rounded-full transition-all duration-200"
                    style={{ color: "rgba(196,181,253,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(196,181,253,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}>
                    {city}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "rgba(196,181,253,0.4)" }}>Tutors by Subject</h5>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subj) => (
                  <a key={subj} href="#"
                    className="text-xs px-2.5 py-1 rounded-full transition-all duration-200"
                    style={{ color: "rgba(196,181,253,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fbbf24"; (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.12)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(196,181,253,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}>
                    {subj}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "rgba(196,181,253,0.35)" }}>
            © {new Date().getFullYear()} TutorFind. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <a key={label} href="#" className="text-xs transition-colors duration-200"
                style={{ color: "rgba(196,181,253,0.35)" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#c4b5fd")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(196,181,253,0.35)")}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
