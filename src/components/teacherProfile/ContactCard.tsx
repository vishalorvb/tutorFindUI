import type { Teacher } from "@/types";

const MODE_LABELS: Record<string, string> = {
  online: "Online",
  home: "Home Tutor",
  both: "Online & Home",
};

export default function ContactCard({ teacher }: { teacher: Teacher }) {
  const whatsappUrl = `https://wa.me/91${teacher.phone_number}?text=${encodeURIComponent(
    `Hi, I found your profile on TutorHub. I'm interested in ${teacher.subject} tuition. Can we connect?`
  )}`;

  return (
    <>
      {/* Desktop sticky card */}
      <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hidden lg:block">
        {/* Fee highlight */}
        <div className="text-center mb-5 pb-5 border-b border-slate-50">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">Monthly Fee</p>
          <p className="text-3xl font-black text-slate-900">₹{teacher.fee}</p>
        </div>

        {/* Quick details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Mode</span>
            <span className="font-semibold text-slate-800">{MODE_LABELS[teacher.teaching_mode] ?? teacher.teaching_mode}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Location</span>
            <span className="font-semibold text-slate-800">{teacher.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Experience</span>
            <span className="font-semibold text-slate-800">{teacher.experience} yrs</span>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Phone</p>
            <p className="text-sm font-bold text-slate-800">{teacher.phone_number}</p>
          </div>
        </div>

        {/* CTAs */}
        <a
          href={`tel:${teacher.phone_number}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-bold mb-3 transition-all duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>

        {/* Trust */}
        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.31L10 13.27l-4.78 2.51.91-5.31L2.27 6.62l5.34-.78L10 1z" clipRule="evenodd" />
          </svg>
          Verified tutor profile
        </p>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 px-4 py-3 flex gap-3 shadow-xl">
        <a
          href={`tel:${teacher.phone_number}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  );
}
