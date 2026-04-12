import type { Tuition } from "@/types";

type TuitionSlugInput = Pick<Tuition, "id" | "slug" | "subject" | "course" | "locality" | "city">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTuitionDetailSlug(tuition: TuitionSlugInput) {
  const baseSlug = tuition.slug
    ? slugify(tuition.slug.replace(/-\d+$/, ""))
    : slugify([tuition.subject, tuition.course, tuition.locality, tuition.city].filter(Boolean).join(" "));

  return baseSlug ? `${baseSlug}-${tuition.id}` : String(tuition.id);
}