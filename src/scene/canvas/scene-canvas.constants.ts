export const SCENE_CANVAS = {
  zIndex: 30,
  exposure: 1.05,
} as const;

export const RENDER_LITE = {
  memory: 4,
  cores: 4,
} as const;

export const CANVAS_DPR = {
  min: 1,
  tiers: {
    full: { max: 3, budget: 4_800_000 },
    integrated: { max: 3, budget: 3_200_000 },
    lite: { max: 2, budget: 2_400_000 },
  },
} as const;

export const ADAPTIVE_DPR = {
  start: { full: 1, integrated: 1, lite: 0.5 },
  step: 0.25,
  flipflops: 3,
} as const;

export const INTEGRATED_GPU_PATTERN = /intel|iris|uhd|radeon\(tm\) graphics|vega|mali|adreno|powervr|apple gpu|swiftshader|llvmpipe/i;
