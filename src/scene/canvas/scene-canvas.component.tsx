import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { NeutralToneMapping } from "three";
import { CanvasDpr } from "@/scene/canvas/canvas-dpr.component";
import { canvasDpr, isIntegratedGpu } from "@/scene/canvas/canvas-dpr.util";
import { FrameClear } from "@/scene/canvas/frame-clear.component";
import type { DprTier } from "@/scene/canvas/render-quality.types";
import { isLiteRender } from "@/scene/canvas/render-quality.util";
import { SCENE_CANVAS } from "@/scene/canvas/scene-canvas.constants";
import { SceneWarmup } from "@/scene/loading/scene-warmup.component";
import { graphicsRenderer } from "@/shared/utils/device.util";

function detectTier(): DprTier {
  if (isLiteRender()) {
    return "lite";
  }
  return isIntegratedGpu(graphicsRenderer()) ? "integrated" : "full";
}

export function SceneCanvas() {
  const eventSource = document.getElementById("root") ?? undefined;
  const [tier] = useState(detectTier);

  return (
    <Canvas
      aria-hidden="true"
      className="scene-canvas"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: SCENE_CANVAS.zIndex }}
      dpr={canvasDpr(window.devicePixelRatio, window.innerWidth, window.innerHeight, tier)}
      gl={{ antialias: tier !== "lite", alpha: true, powerPreference: "high-performance" }}
      eventSource={eventSource}
      onCreated={({ gl }) => {
        gl.toneMapping = NeutralToneMapping;
        gl.toneMappingExposure = SCENE_CANVAS.exposure;
      }}
    >
      <CanvasDpr tier={tier} />
      <FrameClear />
      <SceneWarmup />
      <View.Port />
    </Canvas>
  );
}
