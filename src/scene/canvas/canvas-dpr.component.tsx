import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { canvasDpr, scaledDpr } from "@/scene/canvas/canvas-dpr.util";
import { ADAPTIVE_DPR } from "@/scene/canvas/scene-canvas.constants";
import type { CanvasDprProps } from "@/scene/canvas/scene-canvas.interfaces";

export function CanvasDpr({ tier }: CanvasDprProps) {
  const setDpr = useThree((state) => state.setDpr);
  const factor = useRef<number>(ADAPTIVE_DPR.start[tier]);

  const apply = useCallback(() => {
    setDpr(scaledDpr(canvasDpr(window.devicePixelRatio, window.innerWidth, window.innerHeight, tier), factor.current));
  }, [setDpr, tier]);

  useEffect(() => {
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [apply]);

  return (
    <PerformanceMonitor
      factor={ADAPTIVE_DPR.start[tier]}
      step={ADAPTIVE_DPR.step}
      flipflops={ADAPTIVE_DPR.flipflops}
      onDecline={() => {
        factor.current = Math.max(0, factor.current - ADAPTIVE_DPR.step);
        apply();
      }}
      onFallback={() => {
        factor.current = 0;
        apply();
      }}
    />
  );
}
