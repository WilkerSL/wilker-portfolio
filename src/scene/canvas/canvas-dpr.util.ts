import type { DprTier } from "@/scene/canvas/render-quality.types";
import { CANVAS_DPR, INTEGRATED_GPU_PATTERN } from "@/scene/canvas/scene-canvas.constants";
import { clamp } from "@/shared/utils/math.util";

export function canvasDpr(devicePixelRatio: number, width: number, height: number, tier: DprTier): number {
  const limits = CANVAS_DPR.tiers[tier];
  const byDevice = clamp(devicePixelRatio, CANVAS_DPR.min, limits.max);
  const byBudget = Math.sqrt(limits.budget / Math.max(1, width * height));
  return Math.max(CANVAS_DPR.min, Math.min(byDevice, byBudget));
}

export function isIntegratedGpu(renderer: string): boolean {
  return INTEGRATED_GPU_PATTERN.test(renderer);
}
