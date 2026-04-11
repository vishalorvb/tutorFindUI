"use client";

import Link from "next/link";

const testimonials = [
  {
    name: "Aditi Rao",
    role: "Class 11 Student, Hyderabad",
    initials: "AR",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    glow: "rgba(236,72,153,0.3)",
    rating: 5,
    text: "Found a great Math tutor within a day of posting my requirement. She explained concepts so clearly that I started enjoying Math for the first time. Highly recommended!",
    subject: "Mathematics",
    subjectStyle: { background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.2)" },
  },
  {
    name: "Karan Mehta",
    role: "Parent, Delhi",
    initials: "KM",
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    glow: "rgba(79,70,229,0.3)",
    rating: 5,
    text: "My son needed urgent help for his board exams. HomeTutorly matched us with an excellent Chemistry tutor within hours. The free demo was a great way to assess before committing.",
    subject: "Chemistry",
    subjectStyle: { background: "rgba(16,185,129,0.08)", color: "#059669", border: "1px solid rgba(16,185,129,0.2)" },
  },
  {
    name: "Pooja Iyer",
    role: "Engineering Student, Chennai",
    initials: "PI",
    gradient: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
    glow: "rgba(139,92,246,0.3)",
    rating: 5,
    text: "I needed a coding tutor for Python and Data Structures. The platform is incredibly easy to use and within 2 hours I had 3 tutors reaching out to me. Now I'm acing my exams!",
    subject: "Coding",
    subjectStyle: { background: "rgba(245,158,11,0.08)", color: "#d97706", border: "1px solid rgba(245,158,11,0.2)" },
  },
  {
    name: "Sanjay Kumar",
    role: "IIT-JEE Aspirant, Mumbai",
    initials: "SK",
    gradient: "linear-gradient(135deg, #10b981, #0284c7)",
    glow: "rgba(16,185,129,0.3)",
    rating: 5,
    text: "The tutor I found through HomeTutorly has completely transformed my preparation. He has been teaching IIT-JEE for 10 years and really knows what the examiners want.",
    subject: "Physics",
    subjectStyle: { background: "rgba(14,165,233,0.08)", color: "#0284c7", border: "1px solid rgba(14,165,233,0.2)" },
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(160deg, #fafafa 0%, #f0f4ff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-3 border border-violet-200"
            style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
            Student Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            What Students{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Real experiences from students and parents who found the right tutor.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i}
              className="group relative bg-white border border-slate-100 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 50px ${t.glow}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)")}>

              {/* Background glow on hover */}
              <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: t.gradient }} />

              {/* Quote icon */}
              <div className="mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"
                  style={{ color: "rgba(124,58,237,0.15)" }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <StarRating count={t.rating} />

              {/* Text */}
              <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                &quot;{t.text}&quot;
              </p>

              {/* Subject tag */}
              <div className="mt-5 mb-5">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={t.subjectStyle}>
                  {t.subject}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-md"
                  style={{ background: t.gradient, boxShadow: `0 4px 12px ${t.glow}` }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-400 text-sm mb-5">Join thousands of satisfied students</p>
          <Link href="/tuition"
            className="inline-flex items-center gap-2.5 text-white font-black px-8 py-4 rounded-2xl shadow-2xl transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
            Find Your Tutor Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
