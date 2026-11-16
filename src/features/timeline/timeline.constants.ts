import { frameCamera } from "@/scene/views/frame-camera.util";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";

export const TIMELINE_CAMERA: ViewCamera = frameCamera(-0.2, 1.75);

export const TIMELINE_FERRIS_YAW = 0.2;

export const TIMELINE_WALK = {
  media: "(min-width: 1024px)",
  start: "top 50%",
  end: "bottom 50%",
  scrub: 0.6,
  speed: 900,
  settle: 0.3,
} as const;
