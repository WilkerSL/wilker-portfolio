import { PerspectiveCamera } from "three";
import { describe, expect, it } from "vitest";
import { fitCameraWidth, frameCamera } from "@/scene/views/frame-camera.util";

describe("frameCamera", () => {
  it("aims at the middle of the range and backs off until it fits", () => {
    const camera = frameCamera(0, 2, 0, 30);
    expect(camera.target).toEqual([0, 1, 0]);
    const halfHeight = camera.position[2] * Math.tan((15 * Math.PI) / 180);
    expect(halfHeight).toBeCloseTo(1, 6);
  });

  it("only moves the camera back when the view is too narrow", () => {
    const camera = { ...frameCamera(0, 2, 0, 30), width: 4 };
    const view = new PerspectiveCamera(30, 2);
    fitCameraWidth(view, camera, camera.width);
    expect(view.position.z).toBeCloseTo(camera.position[2], 6);
    view.aspect = 1;
    fitCameraWidth(view, camera, camera.width);
    const halfWidth = view.position.z * Math.tan((15 * Math.PI) / 180) * view.aspect;
    expect(halfWidth).toBeCloseTo(2, 6);
  });
});
