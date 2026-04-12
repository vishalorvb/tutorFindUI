import type { Teacher } from "@/types";

const MODE_LABELS: Record<string, string> = {
  online: "Online",
  home: "Home Tutor",
  both: "Online & Home",
};

const MODE_STYLES: Record<string, string> = {
  online: "bg-blue-50 text-blue-600 border-blue-100",
  home: "bg-amber-50 text-amber-600 border-amber-100",
  both: "bg-violet-50 text-violet-600 border-violet-100",
};

export default function TeacherProfile({ teacher }: { teacher: Teacher }) {
  const hasPhoto = !!teacher.photo;
  const subjects = teacher.subject ? teacher.subject.split(/[\s,]+/).filter(Boolean) : [];
  const modeLabel = MODE_LABELS[teacher.teaching_mode] ?? teacher.teaching_mode;
  const modeStyle = MODE_STYLES[teacher.teaching_mode] ?? "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* ── Banner with avatar overlay ── */}
        <div className="relative">
          <div className="h-16 sm:h-20 bg-linear-to-br from-violet-500 via-indigo-500 to-blue-500">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-60" />
          </div>
          {/* Avatar pinned bottom-left of banner */}
          <div className="absolute left-3 sm:left-5 -bottom-6 sm:-bottom-7 z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-[3px] border-white shadow-md overflow-hidden bg-linear-to-br from-violet-100 to-indigo-100">
              {hasPhoto ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={teacher.photo!} alt={teacher.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {/* Mode badge top-right on banner */}
          <span className={`absolute top-2 right-3 sm:right-5 text-[9px] font-semibold px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${modeStyle}`}>
            {modeLabel}
          </span>
        </div>

        {/* ── Content ── */}
        <div className="pt-8 sm:pt-9 px-3 sm:px-5 pb-3">
          {/* Name row */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">{teacher.name}</h1>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Verified
            </span>
          </div>
          {teacher.qualification && (
            <p className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md mb-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
              {teacher.qualification}
            </p>
          )}

          {/* ── Stats row ── */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] mb-2">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ₹{teacher.fee}/mo
            </span>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center gap-1 text-violet-700 font-semibold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" /></svg>
              {teacher.experience}
            </span>
            <span className="text-gray-300">·</span>
            <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {teacher.location}{teacher.pincode ? `, ${teacher.pincode}` : ""}
            </span>
            {teacher.gender && (
              <>
                <span className="text-gray-300">·</span>
                <span className="inline-flex items-center gap-1 text-pink-600 font-medium">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {teacher.gender}
                </span>
              </>
            )}
          </div>

          {/* ── Subjects & Classes chips ── */}
          {(subjects.length > 0 || teacher.classes) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {subjects.map((s) => (
                <span key={s} className="inline-flex items-center gap-0.5 bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  {s}
                </span>
              ))}
              {teacher.classes && (
                <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {teacher.classes}
                </span>
              )}
            </div>
          )}

          {/* ── About ── */}
          {teacher.about && (
            <div className="mb-2 px-3 py-2 rounded-lg border border-indigo-100/60 bg-linear-to-br from-indigo-50/40 via-white to-violet-50/40">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-md bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h6 className="text-xs font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">About Me</h6>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed line-clamp-3">{teacher.about}</p>
            </div>
          )}

          {/* ── Call button ── */}
          <a
            href={`tel:${teacher.phone_number}`}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-white text-sm font-bold transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>

          {/* SEO */}
          <h6 className="sr-only">
            {teacher.subject} Teacher in {teacher.location} with {teacher.experience} Experience
          </h6>
          <p className="sr-only">
            If you are looking for a {teacher.subject} tutor in {teacher.location}, this teacher offers
            structured and practical guidance for students.
          </p>
        </div>
      </section>
    </>
  );
}
