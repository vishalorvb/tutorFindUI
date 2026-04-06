import type { TuitionFilters } from "@/types";

interface FilterChipsProps {
  filters: TuitionFilters;
  onFilterChange: (updates: Partial<TuitionFilters>) => void;
}

const filterLabels = [
  { key: "subject", label: "Subject" },
  { key: "course", label: "Course" },
  { key: "teachingMode", label: "Mode" },
  { key: "location", label: "Location" },
];

export default function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar">
      {filterLabels.map(({ key, label }) => {
        const value = filters[key as keyof TuitionFilters];
        if (!value) return null;
        return (
          <button
            key={key}
            className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-200 flex items-center gap-1 whitespace-nowrap"
            onClick={() => onFilterChange({ [key]: "" })}
          >
            {label}: {value}
            <span className="ml-1 text-violet-400 hover:text-violet-700">×</span>
          </button>
        );
      })}
    </div>
  );
}
