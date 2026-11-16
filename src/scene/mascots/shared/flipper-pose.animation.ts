import type { FlipperMotion } from "@/scene/mascots/shared/flipper-pose.types";
import type { MascotPair, MascotPose } from "@/scene/mascots/shared/mascot-rig.types";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import { TAU } from "@/scene/mascots/shared/toy-motion.constants";
import { lerp } from "@/shared/utils/math.util";

export function poseFlippers(arms: MascotPair, state: MascotState, pose: MascotPose, motion: FlipperMotion): void {
  const phase = state.swing * TAU;
  arms.forEach((arm, index) => {
    const side = index === 0 ? -1 : 1;
    const wave = state.side === side ? state.wave : 0;
    const idle = Math.sin(pose.time * motion.idleRate + index * 1.3) * motion.idle;
    const rest = motion.rest + idle + pose.flap * motion.flapLift;
    const raised = lerp(rest, motion.cheerLift, state.cheer);
    const lift = lerp(raised, motion.waveLift, wave) + Math.sin(phase) * motion.swing * wave;
    arm.rotation.set(motion.waveReach * Math.max(wave, state.cheer), side * Math.sin(phase - 0.6) * motion.twist * wave, side * lift);
  });
}
