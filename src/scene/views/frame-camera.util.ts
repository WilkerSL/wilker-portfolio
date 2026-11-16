import { Vector3, type PerspectiveCamera } from "three";
import type { ViewCamera } from "@/scene/views/mascot-view.interfaces";

const DEFAULT_FOV = 30;
const DEFAULT_LIFT = 0.22;

const offset = new Vector3();

export function fitCameraWidth(view: PerspectiveCamera, camera: ViewCamera, width: number): void {
  const [targetX, targetY, targetZ] = camera.target;
  offset.set(camera.position[0] - targetX, camera.position[1] - targetY, camera.position[2] - targetZ);
  const base = offset.length();
  const needed = width / 2 / (Math.tan((camera.fov * Math.PI) / 360) * view.aspect);
  offset.multiplyScalar(Math.max(base, needed) / base);
  view.position.set(targetX + offset.x, targetY + offset.y, targetZ + offset.z);
  view.lookAt(targetX, targetY, targetZ);
}

export function frameCamera(bottom: number, top: number, lift = DEFAULT_LIFT, fov = DEFAULT_FOV): ViewCamera {
  const middle = (bottom + top) / 2;
  const distance = (top - bottom) / 2 / Math.tan((fov * Math.PI) / 360);
  return { position: [0, middle + lift, distance], target: [0, middle, 0], fov };
}
