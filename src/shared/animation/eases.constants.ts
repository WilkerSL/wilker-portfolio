export const EASE = {
  mass: "mass",
  snap: "snap",
  drip: "drip",
  land: "land",
  out: "power4.out",
  inOut: "power3.inOut",
  in: "power3.in",
} as const;

export const EASE_CURVES: Readonly<Record<"mass" | "snap" | "drip" | "land", string>> = {
  mass: "M0,0 C0.16,1 0.3,1 1,1",
  snap: "M0,0 C0.7,0 0.2,1 1,1",
  drip: "M0,0 C0.4,0 0.62,0.24 0.78,0.62 0.9,0.9 0.96,1 1,1",
  land: "M0,0 C0.3,0 0.42,1.08 0.62,1.08 0.78,1.08 0.84,0.97 1,1",
};

export const DURATION = {
  ui: 0.18,
  reveal: 0.9,
  scene: 1.4,
} as const;

export const SMOOTH_SCROLL_SECONDS = 0.8;
export const SMOOTH_TOUCH_SECONDS = 0.1;

export const REVEAL = {
  distance: 26,
  duration: 0.9,
  stagger: 0.08,
  start: "top 88%",
} as const;
