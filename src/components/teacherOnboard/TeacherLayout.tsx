export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </div>
    </main>
  );
}
