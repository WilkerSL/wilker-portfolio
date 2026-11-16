import type { NavigatorMemory, RenderQuality } from "@/scene/canvas/render-quality.types";
import { RENDER_LITE } from "@/scene/canvas/scene-canvas.constants";

function detectRenderQuality(): RenderQuality {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "full";
  }
  const touchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(any-pointer: fine)").matches;
  const memory = (navigator as NavigatorMemory).deviceMemory ?? RENDER_LITE.memory + 1;
  const cores = navigator.hardwareConcurrency || RENDER_LITE.cores + 1;
  return touchOnly || memory <= RENDER_LITE.memory || cores <= RENDER_LITE.cores ? "lite" : "full";
}

export const RENDER_QUALITY: RenderQuality = detectRenderQuality();

export function isLiteRender(): boolean {
  return RENDER_QUALITY === "lite";
}
