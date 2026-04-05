import type { Tuition } from "@/types";
import TuitionCard from "./TuitionCard";
import EmptyState from "./EmptyState";

interface TuitionListProps {
  tuitions: Tuition[];
}

export default function TuitionList({ tuitions }: TuitionListProps) {
  if (tuitions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-500 mb-4">
        <span className="text-slate-900 font-bold">{tuitions.length}</span> Tuitions Available
      </p>
      <div className="grid gap-4">
        {tuitions.map((t) => (
          <TuitionCard key={t.id} tuition={t} />
        ))}
      </div>
    </div>
  );
}
