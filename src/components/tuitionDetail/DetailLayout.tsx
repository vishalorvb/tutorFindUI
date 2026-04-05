export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle decorative top accent */}
      <div className="h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {children}
      </div>
    </div>
  );
}
