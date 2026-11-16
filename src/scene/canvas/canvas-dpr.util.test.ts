import { describe, expect, it } from "vitest";
import { canvasDpr, isIntegratedGpu, scaledDpr } from "@/scene/canvas/canvas-dpr.util";

describe("canvasDpr", () => {
  it("follows the device ratio on desktop screens", () => {
    expect(canvasDpr(1, 1280, 720, "full")).toBe(1);
    expect(canvasDpr(2, 1440, 900, "full")).toBeCloseTo(1.92, 2);
  });

  it("keeps up with browser zoom while the budget allows", () => {
    expect(canvasDpr(2, 960, 540, "integrated")).toBe(2);
    expect(canvasDpr(3, 640, 360, "integrated")).toBe(3);
  });

  it("caps phones at 2 even when the screen is denser", () => {
    expect(canvasDpr(3, 390, 844, "lite")).toBe(2);
    expect(canvasDpr(2.75, 412, 915, "lite")).toBe(2);
  });

  it("never drops below 1", () => {
    expect(canvasDpr(2, 3840, 2160, "integrated")).toBe(1);
  });
});

describe("scaledDpr", () => {
  it("moves between 1 and the ceiling with the performance factor", () => {
    expect(scaledDpr(2, 0.5)).toBe(1.5);
    expect(scaledDpr(2, 0)).toBe(1);
    expect(scaledDpr(2, 1)).toBe(2);
    expect(scaledDpr(1, 0.5)).toBe(1);
  });
});

describe("isIntegratedGpu", () => {
  it("spots common integrated renderers", () => {
    expect(isIntegratedGpu("ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11)")).toBe(true);
    expect(isIntegratedGpu("ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11)")).toBe(false);
  });
});
