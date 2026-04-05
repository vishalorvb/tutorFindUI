"use client";

const tutors = [
  {
    name: "Priya Sharma",
    initials: "PS",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    glow: "rgba(99,102,241,0.3)",
    subjects: ["Mathematics", "Physics"],
    experience: "8 Years",
    location: "Hyderabad",
    rating: 4.9,
    reviews: 127,
    fee: "₹500/hr",
    badge: "⭐ Top Rated",
    badgeStyle: { background: "rgba(99,102,241,0.1)", color: "#6366f1" },
  },
  {
    name: "Rahul Gupta",
    initials: "RG",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
    glow: "rgba(16,185,129,0.3)",
    subjects: ["Chemistry", "Biology"],
    experience: "6 Years",
    location: "Delhi",
    rating: 4.8,
    reviews: 94,
    fee: "₹450/hr",
    badge: "🧬 NEET Expert",
    badgeStyle: { background: "rgba(16,185,129,0.1)", color: "#10b981" },
  },
  {
    name: "Sneha Patel",
    initials: "SP",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    glow: "rgba(139,92,246,0.3)",
    subjects: ["English", "History"],
    experience: "5 Years",
    location: "Bangalore",
    rating: 4.7,
    reviews: 83,
    fee: "₹400/hr",
    badge: "💬 Highly Rated",
    badgeStyle: { background: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
  },
  {
    name: "Amit Verma",
    initials: "AV",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    glow: "rgba(245,158,11,0.3)",
    subjects: ["Coding", "Computer Science"],
    experience: "7 Years",
    location: "Mumbai",
    rating: 4.9,
    reviews: 112,
    fee: "₹600/hr",
    badge: "💻 Tech Expert",
    badgeStyle: { background: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  },
  {
    name: "Kavita Nair",
    initials: "KN",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    glow: "rgba(14,165,233,0.3)",
    subjects: ["Mathematics", "Economics"],
    experience: "10 Years",
    location: "Chennai",
    rating: 5.0,
    reviews: 148,
    fee: "₹550/hr",
    badge: "🎓 IIT Alumni",
    badgeStyle: { background: "rgba(14,165,233,0.1)", color: "#0ea5e9" },
  },
  {
    name: "Deepak Singh",
    initials: "DS",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    glow: "rgba(79,70,229,0.3)",
    subjects: ["Physics", "Maths"],
    experience: "9 Years",
    location: "Pune",
    rating: 4.8,
    reviews: 99,
    fee: "₹500/hr",
    badge: "🔥 IIT-JEE",
    badgeStyle: { background: "rgba(79,70,229,0.1)", color: "#4f46e5" },
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400 fill-current" : "text-slate-200 fill-current"}`}
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedTutors() {
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
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Tutors</span>
            </h2>
            <p className="mt-2 text-slate-500 max-w-lg">Top-rated, verified tutors across subjects and cities.</p>
          </div>
          <a href="#" className="text-sm font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1.5 transition-colors whitespace-nowrap border border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50">
            View all tutors
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Tutor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutors.map((tutor, i) => (
            <div key={i}
              className="group relative bg-white border border-slate-100 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 24px 60px ${tutor.glow}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)")}>

              {/* Background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300"
                style={{ background: tutor.gradient }} />

              {/* Top row */}
              <div className="flex items-start gap-4 mb-5 relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-xl"
                  style={{ background: tutor.gradient, boxShadow: `0 8px 24px ${tutor.glow}` }}>
                  {tutor.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-black text-slate-900 text-base leading-snug">{tutor.name}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={tutor.badgeStyle}>
                      {tutor.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StarRating rating={tutor.rating} />
                    <span className="text-xs font-black text-amber-500">{tutor.rating}</span>
                    <span className="text-xs text-slate-400">({tutor.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)" }} />

              {/* Subject tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tutor.subjects.map((subj) => (
                  <span key={subj} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-100">
                    {subj}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between mb-5 text-xs">
                <div className="flex items-center gap-1 text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-medium">{tutor.location}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{tutor.experience}</span>
                </div>
                <span className="font-black text-sm" style={{ background: tutor.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {tutor.fee}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex gap-2.5">
                <button className="flex-1 text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  style={{ background: tutor.gradient, boxShadow: `0 4px 16px ${tutor.glow}` }}>
                  Book Demo
                </button>
                <button className="flex-1 border border-slate-200 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 text-slate-700 text-sm font-bold py-2.5 rounded-xl transition-all duration-200">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
