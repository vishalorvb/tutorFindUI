import type { Tuition } from "@/types";

export default function TuitionInfo({ tuition }: { tuition: Tuition }) {
  let icon: string;
  let text: string;
  let wrapperClass: string;

  if (tuition.unlocks === 0) {
    icon = "🚀";
    text = "Be the first to apply";
    wrapperClass = "from-blue-50 to-sky-50 border-blue-200/60 text-blue-700";
  } else if (tuition.unlocks < 10) {
    icon = "👥";
    text = `${tuition.unlocks} teachers contacted`;
    wrapperClass = "from-amber-50 to-orange-50 border-amber-200/60 text-amber-700";
  } else {
    icon = "🔥";
    text = `High demand (${tuition.unlocks}+ applied)`;
    wrapperClass = "from-red-50 to-rose-50 border-red-200/60 text-red-700";
  }

  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border bg-gradient-to-r ${wrapperClass}`}>
      <span className="text-xl">{icon}</span>
      <div>
        <span className="text-sm font-bold">{text}</span>
        <p className="text-xs opacity-70 mt-0.5">Apply now to increase your chances</p>
      </div>
    </div>
  );
}
