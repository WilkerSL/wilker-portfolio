import type { CrabMotion } from "@/scene/mascots/ferris/ferris.types";
import type { ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";

export const FERRIS_FIT = 1.9;
export const FERRIS_SHADOW = 2;
export const FERRIS_EYES = ["eye_right", "eye_left"] as const;
export const FERRIS_CLAWS = ["claw_right", "claw_left"] as const;
export const FERRIS_LEGS = ["leg_right_front", "leg_left_back", "leg_right_back", "leg_left_front"] as const;

export const FERRIS_TOY: ToyMotion = {
  head: "body",
  breathe: 0.012,
  breatheRate: 0.4,
  sway: 0.02,
  bodyLook: 0.4,
  headLook: 0.2,
  pitchLook: 0.08,
  flapGain: 0.6,
};

export const FERRIS_CRAB: CrabMotion = {
  legShuffle: 0.05,
  legRate: 2.2,
  legSplay: 0.35,
  legDance: 0.16,
  clawRest: 0.08,
  clawIdle: 0.05,
  clawIdleRate: 1.4,
  clawWiggle: 0.28,
  clawForward: 0.95,
  clawRaise: 0.85,
  cheerLift: 1,
  cheerReach: 0.7,
  flapLift: 0.35,
  snip: 0.3,
  idleSnipRate: 0.8,
  idleSnipSharpness: 24,
  bounce: 0.035,
  walkRate: 13,
  walkStep: 0.32,
  walkBob: 0.035,
  walkRoll: 0.05,
  squint: 0.78,
  blinkSeconds: 0.12,
  blinkGap: [2.2, 5.5],
};
