import type { FlipperMotion } from "@/scene/mascots/shared/flipper-pose.types";
import type { ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";

export const DUKE_FIT = 1.42;
export const DUKE_SHADOW = 1.4;
export const DUKE_ARMS = ["arm_right", "arm_left"] as const;

export const DUKE_TOY: ToyMotion = {
  head: "body",
  breathe: 0.016,
  breatheRate: 0.3,
  sway: 0.024,
  bodyLook: 0.4,
  headLook: 0.25,
  pitchLook: 0.1,
  flapGain: 0.9,
};

export const DUKE_FLIPPERS: FlipperMotion = {
  rest: 0.12,
  idle: 0.05,
  idleRate: 1.5,
  waveLift: 2.5,
  waveReach: 0.3,
  swing: 0.3,
  twist: 0.35,
  cheerLift: 2.1,
  flapLift: 0.9,
};
