import type { Vector3Tuple, ViewCamera } from "@/scene/views/mascot-view.interfaces";

export const HERO_STACK: readonly string[] = ["Go", "Java", "Spring Boot", "Rust", "React", "C#", "Python"];

export const HERO_CAMERA: ViewCamera = {
  position: [0, 1.78, 5.5],
  target: [0, 0.8, 0],
  fov: 30,
};

export const HERO_SCENE = {
  pedestal: 0.85,
  gopherZ: -0.36,
  desk: [0, 0, 0.1] as Vector3Tuple,
  laptop: [0, 0.44, 0.12] as Vector3Tuple,
  fountain: [0, 0.8, 0.42] as Vector3Tuple,
  fountainSpread: 0.3,
} as const;

export const HERO_TIMING = {
  greet: 1.1,
  type: 2.6,
  typeIn: 0.6,
  fountainIn: 0.8,
} as const;

export const HERO_FOUNTAIN = {
  rate: 2.6,
  burst: 8,
} as const;
