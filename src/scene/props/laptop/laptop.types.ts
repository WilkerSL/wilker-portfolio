import type { Vector3Tuple } from "@/scene/views/mascot-view.interfaces";

export type StickerShape = "pill" | "circle";

export interface StickerSpec {
  readonly shape: StickerShape;
  readonly text: string;
  readonly accent?: string;
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly angle: number;
  readonly fill: string;
  readonly ink: string;
  readonly font: string;
}

export interface LaptopProps {
  readonly position: Vector3Tuple;
  readonly rotationY?: number;
}
