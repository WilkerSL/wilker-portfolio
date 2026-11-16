export const WARMUP = {
  loadShare: 0.75,
  compileShare: 0.92,
  camera: { fov: 30, near: 0.1, far: 50, position: [0, 1, 7] as const, target: [0, 0.8, 0] as const },
  textureKeys: ["map", "emissiveMap", "alphaMap", "normalMap", "roughnessMap", "metalnessMap"] as const,
} as const;
