const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Free Demo Class",
    description: "Try before you commit. Every tutor offers a free demo session so you can evaluate before paying anything.",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glow: "rgba(16,185,129,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Verified Tutors",
    description: "All tutors are background-checked and credential-verified. Only qualified tutors are listed on our platform.",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    glow: "rgba(79,70,229,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Quick Matching",
    description: "Post your requirement and start receiving tutor responses within minutes. No long waiting periods.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No Upfront Payment",
    description: "Pay only after you're fully satisfied with the demo class. The platform is free to use for students.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Home & Online",
    description: "Choose between home tutors who visit you or online tutors for virtual learning — whatever suits you best.",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    glow: "rgba(14,165,233,0.25)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "24/7 Support",
    description: "Our support team is available around the clock to help with any issues or questions you may have.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    glow: "rgba(139,92,246,0.25)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(160deg, #f8f7ff 0%, #f0f4ff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-3 border border-violet-200"
            style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Why Students{" "}
            <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            We make finding the perfect tutor simple, safe, and risk-free.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <div key={i}
              className="group flex gap-5 p-6 rounded-3xl bg-white border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-default shadow-sm hover:shadow-2xl">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg"
                style={{ background: benefit.gradient, boxShadow: `0 6px 20px ${benefit.glow}` }}>
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-black text-slate-900 mb-1.5">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
