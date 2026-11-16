import type { Object3D } from "three";
import type { MascotPair } from "@/scene/mascots/shared/mascot-rig.types";

export interface CrabParts {
  readonly eyes: readonly Object3D[];
  readonly claws: MascotPair;
  readonly legs: readonly Object3D[];
}

export interface CrabMotion {
  readonly legShuffle: number;
  readonly legRate: number;
  readonly legSplay: number;
  readonly legDance: number;
  readonly clawRest: number;
  readonly clawIdle: number;
  readonly clawIdleRate: number;
  readonly clawWiggle: number;
  readonly clawForward: number;
  readonly clawRaise: number;
  readonly cheerLift: number;
  readonly cheerReach: number;
  readonly flapLift: number;
  readonly snip: number;
  readonly idleSnipRate: number;
  readonly idleSnipSharpness: number;
  readonly bounce: number;
  readonly walkRate: number;
  readonly walkStep: number;
  readonly walkBob: number;
  readonly walkRoll: number;
  readonly squint: number;
  readonly blinkSeconds: number;
  readonly blinkGap: readonly [number, number];
}

export interface BlinkClock {
  next: number;
  until: number;
}
