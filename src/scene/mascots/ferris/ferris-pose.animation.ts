import { MathUtils } from "three";
import type { BlinkClock, CrabMotion, CrabParts } from "@/scene/mascots/ferris/ferris.types";
import type { MascotPose } from "@/scene/mascots/shared/mascot-rig.types";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import { TAU } from "@/scene/mascots/shared/toy-motion.constants";

function sideOf(part: { readonly position: { readonly x: number } }): number {
  return part.position.x < 0 ? -1 : 1;
}

function blinkAmount(clock: BlinkClock, motion: CrabMotion, time: number): number {
  if (time > clock.next) {
    clock.until = time + motion.blinkSeconds;
    clock.next = time + MathUtils.randFloat(motion.blinkGap[0], motion.blinkGap[1]);
  }
  return time < clock.until ? 1 : 0;
}

export function poseCrab(parts: CrabParts, state: MascotState, pose: MascotPose, motion: CrabMotion, blink: BlinkClock): void {
  const phase = state.swing * TAU;
  const beat = Math.max(0, Math.sin(phase)) ** 2 * state.wave;
  const idleSnip = Math.max(0, Math.sin(pose.time * motion.idleSnipRate)) ** motion.idleSnipSharpness;
  const snip = Math.max(state.snip, idleSnip, beat);
  const raise = state.wave * motion.clawRaise + state.cheer * motion.cheerLift;
  const reach = state.wave + state.cheer * motion.cheerReach;

  parts.claws.forEach((claw, index) => {
    const side = sideOf(claw);
    const idle = Math.sin(pose.time * motion.clawIdleRate + index * 1.9) * motion.clawIdle;
    const wiggle = Math.sin(phase + index * Math.PI) * motion.clawWiggle * state.wave;
    const lift = motion.clawRest + idle + pose.flap * motion.flapLift + wiggle;
    claw.rotation.set(-raise, side * (reach * motion.clawForward - snip * motion.snip), -side * lift);
  });

  const stride = Math.sin(pose.time * motion.walkRate);
  parts.legs.forEach((leg, index) => {
    const shuffle = Math.sin(pose.time * motion.legRate + index * 1.7) * motion.legShuffle;
    const dance = Math.sin(phase * 2 + index * Math.PI) * motion.legDance * state.wave;
    const step = (index % 2 === 0 ? stride : -stride) * motion.walkStep * state.walk;
    leg.rotation.z = sideOf(leg) * (shuffle + dance + Math.max(0, pose.flap) * motion.legSplay) + step;
  });

  pose.body.position.y += beat * motion.bounce + Math.abs(stride) * motion.walkBob * state.walk;
  pose.body.rotation.z += stride * motion.walkRoll * state.walk;
  const squint = MathUtils.lerp(1, motion.squint, state.wave);
  const eyes = Math.min(squint, MathUtils.lerp(1, 0.08, blinkAmount(blink, motion, pose.time)));
  for (const eye of parts.eyes) {
    eye.scale.y = eyes;
  }
}
