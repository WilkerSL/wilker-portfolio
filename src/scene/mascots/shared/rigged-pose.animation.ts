import { AnimationMixer, Quaternion, Vector3, type Bone, type Object3D } from "three";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import type { MascotPose, ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";
import type { RestEntry, RiggedArm, RiggedLeg, RiggedMotion, RiggedRig } from "@/scene/mascots/shared/rigged-pose.types";
import { TAU, TOY_LIMITS } from "@/scene/mascots/shared/toy-motion.constants";
import type { ModelAsset } from "@/scene/shared/model-asset.types";
import type { Vector3Tuple } from "@/scene/views/mascot-view.interfaces";

const AXIS_X = new Vector3(1, 0, 0);
const AXIS_Y = new Vector3(0, 1, 0);
const AXIS_Z = new Vector3(0, 0, 1);
const IDENTITY = new Quaternion();
const chain = new Quaternion();
const chainInverse = new Quaternion();
const turn = new Quaternion();
const part = new Quaternion();
const look = new Quaternion();
const lookPart = new Quaternion();
const aimTurn = new Quaternion();
const reach = new Vector3();
const aim = new Vector3();

function captureRest(asset: ModelAsset, motion: RiggedMotion): RestEntry[] {
  const bones: Object3D[] = [];
  asset.scene.traverse((object) => {
    if ((object as Bone).isBone) {
      bones.push(object);
    }
  });
  const clip = asset.clips.find((item) => item.name === motion.restClip);
  if (clip !== undefined) {
    const mixer = new AnimationMixer(asset.scene);
    const action = mixer.clipAction(clip);
    action.play();
    mixer.setTime(motion.restTime);
    const pose = bones.map((bone) => ({ bone, quaternion: bone.quaternion.clone(), position: bone.position.clone() }));
    action.stop();
    mixer.uncacheRoot(asset.scene);
    for (const entry of pose) {
      entry.bone.quaternion.copy(entry.quaternion);
      entry.bone.position.copy(entry.position);
    }
  }
  return bones.map((bone) => ({ bone, quaternion: bone.quaternion.clone() }));
}

function riggedArm(asset: ModelAsset, prefix: "Right" | "Left", side: 1 | -1): RiggedArm {
  return { side, arm: asset.node(`${prefix}Arm`), foreArm: asset.node(`${prefix}ForeArm`), hand: asset.node(`${prefix}Hand`) };
}

function riggedLeg(asset: ModelAsset, prefix: "Right" | "Left"): RiggedLeg {
  return { upLeg: asset.node(`${prefix}UpLeg`), leg: asset.node(`${prefix}Leg`) };
}

export function createRiggedRig(asset: ModelAsset, motion: RiggedMotion): RiggedRig {
  return {
    rest: captureRest(asset, motion),
    bones: {
      anchor: asset.scene,
      chest: asset.node("Spine01"),
      neck: asset.node("neck"),
      head: asset.node("Head"),
      arms: [riggedArm(asset, "Right", -1), riggedArm(asset, "Left", 1)],
      legs: [riggedLeg(asset, "Right"), riggedLeg(asset, "Left")],
    },
  };
}

function chainRotation(bone: Object3D, anchor: Object3D, target: Quaternion): Quaternion {
  target.identity();
  let node = bone.parent;
  while (node !== null && node !== anchor) {
    target.premultiply(node.quaternion);
    node = node.parent;
  }
  return target;
}

function rotateIn(bone: Object3D, anchor: Object3D, rotation: Quaternion): void {
  chainRotation(bone, anchor, chain);
  chainInverse.copy(chain).invert();
  turn.copy(chainInverse).multiply(rotation).multiply(chain);
  bone.quaternion.premultiply(turn);
}

function rotateAxis(bone: Object3D, anchor: Object3D, axis: Vector3, angle: number): void {
  if (Math.abs(angle) < 1e-5) {
    return;
  }
  rotateIn(bone, anchor, part.setFromAxisAngle(axis, angle));
}

function lookRotation(yaw: number, pitch: number, roll: number): Quaternion {
  look.setFromAxisAngle(AXIS_Y, yaw);
  look.multiply(lookPart.setFromAxisAngle(AXIS_X, pitch));
  return look.multiply(lookPart.setFromAxisAngle(AXIS_Z, roll));
}

function armDirection(arm: RiggedArm, anchor: Object3D): Vector3 {
  reach.copy(arm.hand.position).applyQuaternion(arm.foreArm.quaternion).add(arm.foreArm.position).applyQuaternion(arm.arm.quaternion);
  return reach.applyQuaternion(chainRotation(arm.arm, anchor, chain)).normalize();
}

function aimArm(arm: RiggedArm, anchor: Object3D, target: Vector3Tuple, weight: number): void {
  if (weight < 1e-3) {
    return;
  }
  const from = armDirection(arm, anchor);
  aim.set(target[0] * arm.side, target[1], target[2]).normalize();
  aimTurn.setFromUnitVectors(from, aim);
  rotateIn(arm.arm, anchor, part.slerpQuaternions(IDENTITY, aimTurn, weight));
}

function swingArm(arm: RiggedArm, anchor: Object3D, motion: RiggedMotion, phase: number, weight: number): void {
  if (weight < 1e-3) {
    return;
  }
  const amount = arm.side * weight;
  rotateAxis(arm.arm, anchor, AXIS_Z, Math.sin(phase) * motion.swing[0] * amount);
  rotateAxis(arm.foreArm, anchor, AXIS_Z, Math.sin(phase - motion.swingLag) * motion.swing[1] * amount);
  rotateAxis(arm.hand, anchor, AXIS_Z, Math.sin(phase - motion.swingLag * 2) * motion.swing[2] * amount);
}

export function applyRiggedPose(rig: RiggedRig, pose: MascotPose, state: MascotState, toy: ToyMotion, motion: RiggedMotion): void {
  for (const entry of rig.rest) {
    entry.bone.quaternion.copy(entry.quaternion);
  }
  const { anchor, chest, neck, head, arms, legs } = rig.bones;
  rotateAxis(chest, anchor, AXIS_X, Math.sin(pose.time * toy.breatheRate * TAU) * motion.breathe);

  const typing = state.type * (1 - state.cheer);
  const nod = Math.sin(pose.time * motion.typeRate * 0.5) * TOY_LIMITS.typeNod * typing;
  const pitch = pose.headPitch + typing * motion.typePitch + nod;
  const roll = state.tilt - state.side * motion.waveTilt * state.wave;
  const share = motion.neckShare;
  rotateIn(neck, anchor, lookRotation(pose.headYaw * share, pitch * share, roll * share));
  rotateIn(head, anchor, lookRotation(pose.headYaw * (1 - share), pitch * (1 - share), roll * (1 - share)));

  const phase = state.swing * TAU;
  for (const arm of arms) {
    const wave = arm.side === state.side ? state.wave : 0;
    const keys = typing * (1 - wave);
    rotateAxis(arm.arm, anchor, AXIS_X, Math.sin(pose.time * TOY_LIMITS.armIdleRate + arm.side) * motion.armIdle * (1 - typing));
    aimArm(arm, anchor, motion.typeAim, typing);
    const tap = Math.sin(pose.time * motion.typeRate + (arm.side > 0 ? 0 : 2.1)) * Math.sin(pose.time * motion.typeRate * 0.37 + arm.side);
    rotateAxis(arm.foreArm, anchor, AXIS_X, -Math.abs(tap) * motion.typeTap * keys);
    aimArm(arm, anchor, motion.waveAim, wave);
    aimArm(arm, anchor, motion.cheerAim, state.cheer);
    swingArm(arm, anchor, motion, phase, wave);
    rotateAxis(arm.arm, anchor, AXIS_Z, arm.side * pose.flap * motion.flapLift);
  }

  const tuck = Math.min(1, Math.max(0, state.hop) / TOY_LIMITS.tuckHeight) * motion.legTuck;
  legs.forEach((leg, index) => {
    const stagger = 1 - index * 0.25;
    rotateAxis(leg.upLeg, anchor, AXIS_X, -tuck * stagger);
    rotateAxis(leg.leg, anchor, AXIS_X, tuck * stagger * 2);
  });
}
