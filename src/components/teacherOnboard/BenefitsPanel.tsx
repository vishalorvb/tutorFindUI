import { CheckCircle } from "lucide-react";

const benefits = [
  "Get matched with students in your area",
  "Set your own schedule and fees",
  "Grow your teaching career online & offline",
  "Free profile listing — no hidden charges",
  "Direct contact with parents & students",
];

export default function BenefitsPanel() {
  return (
    <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white sticky top-24">
      <h3 className="text-lg font-bold mb-1">Start Getting Students Near You</h3>
      <p className="text-violet-200 text-sm mb-6">
        Join 2,000+ tutors already growing their teaching career on TutorFind.
      </p>

      <ul className="space-y-4 mb-8">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-violet-200 shrink-0 mt-0.5" />
            <span className="text-sm leading-snug">{b}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/20 pt-5">
        <p className="text-xs text-violet-200">
          ⭐ Trusted by teachers across 50+ cities in India
        </p>
      </div>
    </div>
  );
}
