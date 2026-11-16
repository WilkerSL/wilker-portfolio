export const Proficiency = {
  Daily: "daily",
  Work: "work",
  Frequent: "frequent",
  Learning: "learning",
} as const;

export type Proficiency = (typeof Proficiency)[keyof typeof Proficiency];
