import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";

export function createMascotState(overrides: Partial<MascotState> = {}): MascotState {
  return {
    x: 0,
    y: 0,
    z: 0,
    rotY: 0,
    lookX: 0,
    lookY: 0,
    drag: 0,
    scale: 1,
    visible: 1,
    hop: 0,
    squash: 0,
    spin: 0,
    wave: 0,
    swing: 0,
    side: 1,
    cheer: 0,
    tilt: 0,
    glance: 0,
    snip: 0,
    walk: 0,
    type: 0,
    ...overrides,
  };
}
