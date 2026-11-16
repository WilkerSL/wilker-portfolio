export const TAU = Math.PI * 2;

export const TOY_SPRING = {
  yaw: { stiffness: 42, damping: 9 },
  head: { stiffness: 120, damping: 16 },
  drag: { stiffness: 70, damping: 6.5 },
  flap: { stiffness: 80, damping: 8 },
} as const;

export const TOY_LIMITS = {
  flap: 1.1,
  shadowLift: 0.9,
  shadowMin: 0.5,
  swayRate: 0.8,
  armIdleRate: 1.3,
  tuckHeight: 0.3,
  typeNod: 0.025,
  maxStep: 1 / 30,
  minStep: 1 / 240,
} as const;
