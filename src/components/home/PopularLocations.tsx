import Link from "next/link";

const cities = [
  { name: "Hyderabad", tutors: "450+", icon: "🏙️", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
  { name: "Delhi", tutors: "620+", icon: "🕌", gradient: "linear-gradient(135deg, #ef4444, #f97316)" },
  { name: "Bangalore", tutors: "530+", icon: "🌆", gradient: "linear-gradient(135deg, #10b981, #0ea5e9)" },
  { name: "Mumbai", tutors: "580+", icon: "🌃", gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)" },
  { name: "Chennai", tutors: "310+", icon: "🏛️", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { name: "Pune", tutors: "280+", icon: "🎓", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { name: "Kolkata", tutors: "260+", icon: "🌉", gradient: "linear-gradient(135deg, #0ea5e9, #10b981)" },
  { name: "Ahmedabad", tutors: "200+", icon: "🏗️", gradient: "linear-gradient(135deg, #f97316, #f59e0b)" },
  { name: "Jaipur", tutors: "180+", icon: "🏰", gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)" },
  { name: "Lucknow", tutors: "150+", icon: "🕍", gradient: "linear-gradient(135deg, #10b981, #6366f1)" },
];

export default function PopularLocations() {
  return (
    <section id="locations" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #f8f7ff 100%)" }}>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-violet-200"
            style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
            Find Tutors Nearby
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Popular{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Cities</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Home tutors and online tutors available across India&apos;s major cities.
          </p>
        </div>

        {/* City grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {cities.map((city, i) => (
            <Link key={i} href={`/tuition/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative flex flex-col items-center text-center p-5 bg-white border border-slate-100 rounded-2xl hover:border-transparent overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-2xl">

              {/* Background fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300"
                style={{ background: city.gradient }} />

              {/* Bottom colored bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-b-2xl"
                style={{ background: city.gradient }} />

              <span className="text-3xl mb-2.5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {city.icon}
              </span>
              <p className="text-sm font-black text-slate-800 group-hover:text-slate-900 transition-colors">
                {city.name}
              </p>
              <p className="text-xs font-semibold mt-1 transition-colors"
                style={{ background: city.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {city.tutors} tutors
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
