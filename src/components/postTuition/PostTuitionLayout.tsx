export default function PostTuitionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
        {children}
      </div>
    </div>
  );
}
