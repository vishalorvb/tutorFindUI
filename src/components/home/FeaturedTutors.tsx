import Link from "next/link";
import { getLatestTeachers } from "@/lib/api/teacher";
import type { Teacher } from "@/types";

// Cycle through these for avatar gradient + glow
const GRADIENTS = [
  { gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", glow: "rgba(99,102,241,0.3)" },
  { gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)", glow: "rgba(16,185,129,0.3)" },
  { gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", glow: "rgba(139,92,246,0.3)" },
  { gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)", glow: "rgba(245,158,11,0.3)" },
  { gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", glow: "rgba(14,165,233,0.3)" },
  { gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", glow: "rgba(79,70,229,0.3)" },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default async function FeaturedTutors() {
  let tutors: Teacher[] = [];
  try {
    const data = await getLatestTeachers(1);
    tutors = data.slice(0, 6);
  } catch {
    // silently fail — section just won't render
  }

  if (tutors.length === 0) return null;

  return (
    <section id="tutors" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-3 border border-violet-200"
              style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
              Hand-Picked
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
              Featured{" "}
              <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Tutors</span>
            </h2>
            <p className="mt-2 text-slate-500 max-w-lg">Top-rated, verified tutors across subjects and cities.</p>
          </div>
          <Link href="/teachers" className="text-sm font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1.5 transition-colors whitespace-nowrap border border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50">
            View all tutors
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Tutor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor, i) => {
            const { gradient, glow } = GRADIENTS[i % GRADIENTS.length];
            const subjects = tutor.subject ? tutor.subject.split(/[\s,]+/).filter(Boolean) : [];
            const modeLabel = tutor.teaching_mode === "online" ? "Online" : tutor.teaching_mode === "both" ? "Online & Home" : "Home Tutor";
            return (
              <Link
                key={tutor.id}
                href={`/teachers/${tutor.slug}-${tutor.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-2xl"
              >
                {/* Colored banner */}
                <div className="relative h-24 shrink-0" style={{ background: gradient }}>
                  {/* Mode badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                    {modeLabel}
                  </span>
                  {/* Avatar — overlaps banner */}
                  <div
                    className="absolute -bottom-7 left-5 w-14 h-14 rounded-2xl overflow-hidden border-2 border-white ring-2"
                    style={{ boxShadow: `0 4px 20px ${glow}` }}
                  >
                    {tutor.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-lg" style={{ background: gradient }}>
                        {initials(tutor.name)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 px-5 pt-10 pb-5">
                  {/* Name */}
                  <div className="mb-3">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">{tutor.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{tutor.qualification}</p>
                  </div>

                  {/* Description */}
                  {tutor.about && (
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{tutor.about}</p>
                  )}

                  {/* Subject & Class pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {subjects.slice(0, 4).map((subj) => (
                      <span key={subj} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                        {subj}
                      </span>
                    ))}
                    {tutor.classes && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                        {tutor.classes}
                      </span>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between py-3 border-t border-slate-50 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{tutor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{tutor.experience} yrs</span>
                      </div>
                      <span className="font-bold text-sm" style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        &#8377;{tutor.fee}/mo
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      className="w-full text-center text-white text-sm font-bold py-2.5 rounded-xl mt-2 transition-all duration-200 group-hover:opacity-90"
                      style={{ background: gradient }}
                    >
                      View Profile
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
