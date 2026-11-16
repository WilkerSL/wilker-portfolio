export const TimelineBranch = {
  Work: "work",
  Study: "study",
  Projects: "projects",
} as const;

export type TimelineBranch = (typeof TimelineBranch)[keyof typeof TimelineBranch];
