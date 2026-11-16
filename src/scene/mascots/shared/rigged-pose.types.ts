import type { Object3D, Quaternion } from "three";
import type { Vector3Tuple } from "@/scene/views/mascot-view.interfaces";

export interface RiggedArm {
  readonly side: 1 | -1;
  readonly arm: Object3D;
  readonly foreArm: Object3D;
  readonly hand: Object3D;
}

export interface RiggedLeg {
  readonly upLeg: Object3D;
  readonly leg: Object3D;
}

export interface RiggedBones {
  readonly anchor: Object3D;
  readonly chest: Object3D;
  readonly neck: Object3D;
  readonly head: Object3D;
  readonly arms: readonly [RiggedArm, RiggedArm];
  readonly legs: readonly [RiggedLeg, RiggedLeg];
}

export interface RestEntry {
  readonly bone: Object3D;
  readonly quaternion: Quaternion;
}

export interface RiggedRig {
  readonly bones: RiggedBones;
  readonly rest: readonly RestEntry[];
}

export interface RiggedMotion {
  readonly restClip: string;
  readonly restTime: number;
  readonly neckShare: number;
  readonly breathe: number;
  readonly waveAim: Vector3Tuple;
  readonly cheerAim: Vector3Tuple;
  readonly swing: Vector3Tuple;
  readonly swingLag: number;
  readonly waveTilt: number;
  readonly flapLift: number;
  readonly armIdle: number;
  readonly legTuck: number;
  readonly typeAim: Vector3Tuple;
  readonly typeTap: number;
  readonly typeRate: number;
  readonly typePitch: number;
}
