import type { Teacher } from "@/types";

export default function AboutSection({ teacher }: { teacher: Teacher }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
      <h2 className="text-base font-black text-slate-900 mb-3">About Teacher</h2>

      {teacher.about ? (
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{teacher.about}</p>
      ) : (
        <p className="text-slate-400 text-sm italic">No description provided.</p>
      )}

      {/* SEO paragraph */}
      <p className="mt-4 text-xs text-slate-400 leading-relaxed border-t border-slate-50 pt-4">
        If you are looking for {teacher.subject} tutors in {teacher.location}, this experienced teacher
        provides quality guidance for students. With {teacher.experience} years of teaching experience
        and a qualification of {teacher.qualification}, {teacher.name} offers{" "}
        {teacher.teaching_mode === "both"
          ? "both online and home"
          : teacher.teaching_mode}{" "}
        tuition at ₹{teacher.fee}/month.
      </p>
    </div>
  );
}
