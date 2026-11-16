import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";

export interface MascotPuppet {
  readonly state: MascotState;
  wave(): void;
  hop(): void;
  enter(): void;
  fidget(): void;
}
