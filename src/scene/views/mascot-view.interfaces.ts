import type { ReactNode, Ref } from "react";

export type Vector3Tuple = readonly [number, number, number];

export interface ViewCamera {
  readonly position: Vector3Tuple;
  readonly target: Vector3Tuple;
  readonly fov: number;
  readonly width?: number;
}

export interface ViewVisibility {
  current: boolean;
}

export interface ViewCameraRigProps {
  readonly camera: ViewCamera;
}

export interface MascotViewProps {
  readonly camera: ViewCamera;
  readonly className?: string;
  readonly children: ReactNode;
  readonly ref?: Ref<HTMLDivElement>;
  readonly onPointerEnter?: () => void;
  readonly onClick?: () => void;
}

export interface LookTarget {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  lookX: number;
  lookY: number;
  drag: number;
}

export interface CursorFollowProps {
  readonly element: { readonly current: HTMLElement | null };
  readonly targets: readonly LookTarget[];
}
