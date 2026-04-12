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
  const activeFilters = filterLabels.filter(({ key }) => filters[key as keyof TuitionFilters]);
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1">
      {activeFilters.map(({ key, label }) => {
        const value = filters[key as keyof TuitionFilters];
        return (
          <button
            key={key}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold border border-blue-100 whitespace-nowrap hover:bg-blue-100 transition-colors active:scale-[0.97]"
            onClick={() => onFilterChange({ [key]: "" })}
          >
            {label}: {value}
            <svg className="w-3 h-3 text-blue-400 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
