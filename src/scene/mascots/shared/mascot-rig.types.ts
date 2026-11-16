import type { RefObject } from "react";
import type { Group, Mesh, Object3D } from "three";

export type MascotPair = readonly [Object3D, Object3D];

export interface MascotRig {
  readonly root: Object3D;
  readonly body: Object3D;
  readonly shadow: Object3D;
}

export interface MascotRigRefs {
  readonly root: RefObject<Group | null>;
  readonly body: RefObject<Group | null>;
  readonly shadow: RefObject<Mesh | null>;
}

export interface ToySpring {
  value: number;
  velocity: number;
}

export interface SpringSetting {
  readonly stiffness: number;
  readonly damping: number;
}

export interface ToyClock {
  readonly seed: number;
  readonly yaw: ToySpring;
  readonly headYaw: ToySpring;
  readonly headPitch: ToySpring;
  readonly drag: ToySpring;
  readonly flap: ToySpring;
  primed: boolean;
  lastHop: number;
}

export type HeadMount = "bones" | "body";

export interface ToyMotion {
  readonly head: HeadMount;
  readonly breathe: number;
  readonly breatheRate: number;
  readonly sway: number;
  readonly bodyLook: number;
  readonly headLook: number;
  readonly pitchLook: number;
  readonly flapGain: number;
}

export interface MascotPose {
  readonly root: Object3D;
  readonly body: Object3D;
  readonly time: number;
  readonly delta: number;
  readonly flap: number;
  readonly headYaw: number;
  readonly headPitch: number;
}

export type MascotPoseHook = (pose: MascotPose) => void;
