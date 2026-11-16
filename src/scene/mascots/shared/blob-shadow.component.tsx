import { useMemo } from "react";
import { CanvasTexture, MeshBasicMaterial, SRGBColorSpace } from "three";
import type { BlobShadowProps } from "@/scene/mascots/shared/blob-shadow.interfaces";

let sharedTexture: CanvasTexture | null = null;

function shadowTexture(): CanvasTexture {
  if (sharedTexture !== null) {
    return sharedTexture;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context !== null) {
    const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 62);
    gradient.addColorStop(0, "rgba(0,0,0,0.85)");
    gradient.addColorStop(0.45, "rgba(0,0,0,0.45)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  sharedTexture = new CanvasTexture(canvas);
  sharedTexture.colorSpace = SRGBColorSpace;
  return sharedTexture;
}

export function BlobShadow({ size, opacity = 0.34, ref }: BlobShadowProps) {
  const material = useMemo(
    () => new MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity }),
    [opacity],
  );

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position-y={0.012} material={material} renderOrder={1}>
      <planeGeometry args={[size, size * 0.8]} />
    </mesh>
  );
}
