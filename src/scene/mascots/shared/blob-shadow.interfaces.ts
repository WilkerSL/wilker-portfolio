import type { Ref } from "react";
import type { Mesh } from "three";

export interface BlobShadowProps {
  readonly size: number;
  readonly opacity?: number;
  readonly ref?: Ref<Mesh>;
}
