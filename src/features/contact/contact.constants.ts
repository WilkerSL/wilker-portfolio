import { MascotId } from "@/core/enums/mascot-id.enum";
import { frameCamera } from "@/scene/views/frame-camera.util";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";
import type { CastMascot } from "@/features/cast/cast.types";

export const CONTACT_LINEUP: readonly { readonly mascot: CastMascot; readonly x: number; readonly z: number; readonly rotY: number }[] = [
  { mascot: MascotId.Gopher, x: -2.15, z: 0.2, rotY: 0.3 },
  { mascot: MascotId.Duke, x: -0.75, z: -0.2, rotY: 0.12 },
  { mascot: MascotId.DotnetBot, x: 0.6, z: 0, rotY: -0.1 },
  { mascot: MascotId.Ferris, x: 2.05, z: 0.3, rotY: -0.28 },
];

export const CONTACT_CAMERA: ViewCamera = { ...frameCamera(-1.4, 3.1, 0.6), width: 6.6 };

export const CONTACT_WAVE_STAGGER = 0.16;
export const CONTACT_COPIED_MS = 2200;
