import type { AnimationClip, Object3D } from "three";

export interface ModelAsset {
  readonly scene: Object3D;
  readonly clips: readonly AnimationClip[];
  node(name: string): Object3D;
}

export interface ModelAssetOptions {
  readonly glow?: number;
}
