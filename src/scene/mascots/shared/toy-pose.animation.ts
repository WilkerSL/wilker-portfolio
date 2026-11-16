import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import type { MascotPose, MascotRig, SpringSetting, ToyClock, ToyMotion, ToySpring } from "@/scene/mascots/shared/mascot-rig.types";
import { TAU, TOY_LIMITS, TOY_SPRING } from "@/scene/mascots/shared/toy-motion.constants";
import { clamp } from "@/shared/utils/math.util";

export function springTo(spring: ToySpring, target: number, setting: SpringSetting, delta: number): number {
  const force = (target - spring.value) * setting.stiffness - spring.velocity * setting.damping;
  spring.velocity += force * delta;
  spring.value += spring.velocity * delta;
  return spring.value;
}

function createSpring(): ToySpring {
  return { value: 0, velocity: 0 };
}

export function createToyClock(): ToyClock {
  return {
    seed: Math.random() * 100,
    yaw: createSpring(),
    headYaw: createSpring(),
    headPitch: createSpring(),
    drag: createSpring(),
    flap: createSpring(),
    primed: false,
    lastHop: 0,
  };
}

export function placeRoot(rig: MascotRig, state: MascotState, clock: ToyClock): boolean {
  const visible = state.visible > 0.001 && state.scale > 0.002;
  rig.root.visible = visible;
  if (!visible) {
    return false;
  }
  if (!clock.primed) {
    clock.primed = true;
    clock.yaw.value = state.rotY;
    clock.lastHop = state.hop;
  }
  rig.root.position.set(state.x, state.y, state.z);
  rig.root.scale.setScalar(Math.max(0.0001, state.scale * state.visible));
  return true;
}

export function applyToyPose(rig: MascotRig, state: MascotState, motion: ToyMotion, clock: ToyClock, elapsed: number, delta: number): MascotPose {
  const time = elapsed + clock.seed;
  const yaw = springTo(clock.yaw, state.rotY + state.lookX * motion.bodyLook, TOY_SPRING.yaw, delta);
  const headYaw = springTo(clock.headYaw, state.lookX * motion.headLook + state.glance, TOY_SPRING.head, delta);
  const headPitch = springTo(clock.headPitch, state.lookY * motion.pitchLook, TOY_SPRING.head, delta);
  const drag = springTo(clock.drag, state.drag, TOY_SPRING.drag, delta);
  const rise = (state.hop - clock.lastHop) / Math.max(delta, TOY_LIMITS.minStep);
  clock.lastHop = state.hop;
  const flap = springTo(clock.flap, clamp(rise * motion.flapGain, -TOY_LIMITS.flap, TOY_LIMITS.flap), TOY_SPRING.flap, delta);

  const breath = Math.sin(time * motion.breatheRate * TAU) * motion.breathe;
  const stretch = 1 + state.squash + breath;
  const girth = 1 / Math.sqrt(stretch);
  const inBody = motion.head === "body";
  const sway = Math.sin(time * TOY_LIMITS.swayRate) * motion.sway;

  rig.root.rotation.y = yaw + state.spin;
  rig.body.position.y = state.hop;
  rig.body.scale.set(girth, stretch, girth);
  rig.body.rotation.set(drag + (inBody ? headPitch : 0), inBody ? headYaw : 0, sway + (inBody ? state.tilt : 0));

  const shadow = Math.max(TOY_LIMITS.shadowMin, 1 - state.hop * TOY_LIMITS.shadowLift);
  rig.shadow.scale.set(shadow, shadow, 1);
  rig.shadow.position.y = 0.012 - state.y;

  return { root: rig.root, body: rig.body, time, delta, flap, headYaw, headPitch };
}
