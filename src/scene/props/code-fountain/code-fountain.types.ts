import type { Vector3Tuple } from "@/scene/views/mascot-view.interfaces";

export type CodeTone = "keyword" | "operator" | "plain" | "string";

export interface CodeToken {
  readonly text: string;
  readonly tone: CodeTone;
}

export interface FountainParticle {
  active: boolean;
  age: number;
  life: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  angle: number;
  spin: number;
}

export interface FountainControl {
  rate: number;
  burst: number;
}

export interface FadingText {
  fillOpacity: number;
}

export interface CodeFountainProps {
  readonly origin: Vector3Tuple;
  readonly spread: number;
  readonly control: FountainControl;
}
