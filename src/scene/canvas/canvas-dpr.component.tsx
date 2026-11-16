import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { canvasDpr } from "@/scene/canvas/canvas-dpr.util";
import type { CanvasDprProps } from "@/scene/canvas/scene-canvas.interfaces";

export function CanvasDpr({ tier }: CanvasDprProps) {
  const setDpr = useThree((state) => state.setDpr);

  useEffect(() => {
    const update = () => setDpr(canvasDpr(window.devicePixelRatio, window.innerWidth, window.innerHeight, tier));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setDpr, tier]);

  return null;
}
