import type { ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";
import type { RiggedMotion } from "@/scene/mascots/shared/rigged-pose.types";

export const DOTNET_FIT = 1.35;
export const DOTNET_SHADOW = 1.3;

export const DOTNET_TOY: ToyMotion = {
  head: "bones",
  breathe: 0.008,
  breatheRate: 0.28,
  sway: 0.014,
  bodyLook: 0.3,
  headLook: 0.4,
  pitchLook: 0.18,
  flapGain: 0.5,
};

export const DOTNET_RIG: RiggedMotion = {
  restClip: "idle",
  restTime: 0.2,
  neckShare: 0.3,
  breathe: 0.015,
  waveAim: [0.42, 0.86, 0.3],
  cheerAim: [0.8, 0.58, 0.15],
  swing: [0.18, 0.42, 0.28],
  swingLag: 0.55,
  waveTilt: 0.12,
  flapLift: 0.45,
  armIdle: 0.035,
  legTuck: 0.55,
  typeAim: [-0.3, -0.5, 0.8],
  typeTap: 0.32,
  typeRate: 13,
  typePitch: 0.22,
};
