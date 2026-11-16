import type { StickerSpec } from "@/scene/props/laptop/laptop.types";

export const LAPTOP = {
  width: 0.62,
  depth: 0.42,
  baseHeight: 0.026,
  lidHeight: 0.36,
  lidThickness: 0.018,
  radius: 0.016,
  openAngle: (112 * Math.PI) / 180,
  keyboardInset: 0.05,
  keyboardDepth: 0.24,
  shell: "#e8edf2",
  keyboard: "#20252c",
  screen: "#d8f6ff",
  texture: { width: 620, height: 400 },
} as const;

export const LAPTOP_STICKERS: readonly StickerSpec[] = [
  { shape: "pill", text: "go", x: 0.24, y: 0.3, size: 0.2, angle: -0.14, fill: "#00add8", ink: "#ffffff", font: "800 {size}px 'Mona Sans Variable', sans-serif" },
  { shape: "circle", text: "W", accent: ".", x: 0.68, y: 0.42, size: 0.25, angle: 0.08, fill: "#111114", ink: "#ffffff", font: "800 {size}px 'Mona Sans Variable', sans-serif" },
  { shape: "pill", text: "</>", x: 0.36, y: 0.7, size: 0.15, angle: 0.1, fill: "#d2f1f9", ink: "#007da0", font: "700 {size}px 'Monaspace Neon', monospace" },
  { shape: "circle", text: "{ }", x: 0.8, y: 0.78, size: 0.16, angle: -0.12, fill: "#ffffff", ink: "#111114", font: "700 {size}px 'Monaspace Neon', monospace" },
];
