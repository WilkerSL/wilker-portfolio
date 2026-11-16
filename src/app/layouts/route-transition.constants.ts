export const ROUTE_TRANSITION = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -28 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
} as const;
