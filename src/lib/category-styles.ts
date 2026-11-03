export type CategoryStyle = {
  badge: string;
  soft: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  fiction: {
    badge: "bg-[#eaf6ff] text-[#2878a5]",
    soft: "bg-[#eaf6ff]",
  },
  science: {
    badge: "bg-[#dcefe9] text-[#407b67]",
    soft: "bg-[#eaf4f0]",
  },
  history: {
    badge: "bg-[#f7e8df] text-[#a26246]",
    soft: "bg-[#fbf1ea]",
  },
  kids: {
    badge: "bg-[#fbe8ef] text-[#a8436a]",
    soft: "bg-[#fdf0f5]",
  },
  "self-help": {
    badge: "bg-[#e9e3f5] text-[#68558b]",
    soft: "bg-[#f3effa]",
  },
  classic: {
    badge: "bg-[#f2ecdf] text-[#8a6a45]",
    soft: "bg-[#f8f4ea]",
  },
  nonfiction: {
    badge: "bg-[#fdeee0] text-[#a2622e]",
    soft: "bg-[#fdf3e9]",
  },
  others: {
    badge: "bg-slate-100 text-slate-600",
    soft: "bg-[#f1f5f9]",
  },
};

export function getCategoryStyle(category?: string | null): CategoryStyle {
  const key = category?.trim().toLowerCase();
  return (key && CATEGORY_STYLES[key]) || CATEGORY_STYLES.others;
}
