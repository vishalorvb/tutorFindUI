import Link from "next/link";

const subjects = [
  { name: "Math Tutor", slug: "math-tutor", icon: "📐", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", glow: "rgba(99,102,241,0.25)", count: "320+ Tutors" },
  { name: "Physics Tutor", slug: "physics-tutor", icon: "⚛️", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", glow: "rgba(139,92,246,0.25)", count: "180+ Tutors" },
  { name: "Chemistry Tutor", slug: "chemistry-tutor", icon: "🧪", gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)", glow: "rgba(16,185,129,0.25)", count: "210+ Tutors" },
  { name: "Biology Tutor", slug: "biology-tutor", icon: "🧬", gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", glow: "rgba(14,165,233,0.25)", count: "155+ Tutors" },
  { name: "English Tutor", slug: "english-tutor", icon: "📖", gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)", glow: "rgba(245,158,11,0.25)", count: "290+ Tutors" },
  { name: "Coding Tutor", slug: "coding-tutor", icon: "💻", gradient: "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)", glow: "rgba(79,70,229,0.25)", count: "140+ Tutors" },
  { name: "Hindi Tutor", slug: "hindi-tutor", icon: "🗣️", gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)", glow: "rgba(239,68,68,0.25)", count: "200+ Tutors" },
  { name: "Commerce Tutor", slug: "commerce-tutor", icon: "📊", gradient: "linear-gradient(135deg, #f59e0b 0%, #10b981 100%)", glow: "rgba(245,158,11,0.2)", count: "170+ Tutors" },
];

export default function SubjectCategories() {
  return (
    <section id="subjects" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-violet-200"
            style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
            Explore By Subject
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Find a Tutor by{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Subject</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Browse verified tutors across all major subjects — school to competitive exams.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {subjects.map((subject, i) => (
            <Link key={i} href={`/tuition/${subject.slug}`}
              className="group relative flex flex-col items-center text-center p-6 sm:p-7 bg-white border border-slate-100 rounded-3xl hover:border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-sm hover:shadow-2xl">

              {/* Background fill on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300"
                style={{ background: subject.gradient }} />

              {/* Icon with gradient bg */}
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-lg"
                style={{ background: subject.gradient, boxShadow: `0 8px 24px ${subject.glow}` }}>
                {subject.icon}
              </div>

              <h3 className="text-sm sm:text-base font-black text-slate-800 group-hover:text-slate-900 transition-colors leading-snug">
                {subject.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 font-semibold">{subject.count}</p>

              {/* Arrow on hover */}
              <div className="mt-3 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                style={{ background: subject.gradient }}>
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link href="/tuition" className="inline-flex items-center gap-2 font-bold text-violet-600 hover:text-violet-700 border border-violet-200 hover:border-violet-400 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-violet-50">
            View all subjects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
