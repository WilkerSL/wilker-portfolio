import type { ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";
import type { RiggedMotion } from "@/scene/mascots/shared/rigged-pose.types";

export const GOPHER_FIT = 1.52;
export const GOPHER_SHADOW = 1.45;

export const GOPHER_TOY: ToyMotion = {
  head: "bones",
  breathe: 0.012,
  breatheRate: 0.3,
  sway: 0.018,
  bodyLook: 0.32,
  headLook: 0.42,
  pitchLook: 0.2,
  flapGain: 0.55,
};

export const GOPHER_RIG: RiggedMotion = {
  restClip: "idle",
  restTime: 0.2,
  neckShare: 0.35,
  breathe: 0.02,
  waveAim: [0.3, 0.9, 0.38],
  cheerAim: [0.78, 0.6, 0.18],
  swing: [0.3, 0.5, 0.45],
  swingLag: 0.7,
  waveTilt: 0.14,
  flapLift: 0.5,
  armIdle: 0.05,
  legTuck: 0.35,
  typeAim: [-0.32, -0.54, 0.78],
  typeTap: 0.32,
  typeRate: 13,
  typePitch: 0.22,
};
