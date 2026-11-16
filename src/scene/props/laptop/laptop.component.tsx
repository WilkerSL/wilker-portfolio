import { useMemo } from "react";
import { MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PlaneGeometry } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { isLiteRender } from "@/scene/canvas/render-quality.util";
import { LAPTOP } from "@/scene/props/laptop/laptop.constants";
import { stickerTexture } from "@/scene/props/laptop/laptop-texture.util";
import type { LaptopProps } from "@/scene/props/laptop/laptop.types";

const geometry = {
  base: new RoundedBoxGeometry(LAPTOP.width, LAPTOP.baseHeight, LAPTOP.depth, 4, LAPTOP.radius),
  lid: new RoundedBoxGeometry(LAPTOP.width, LAPTOP.lidThickness, LAPTOP.lidHeight, 4, LAPTOP.radius * 0.8),
  keyboard: new PlaneGeometry(LAPTOP.width - LAPTOP.keyboardInset * 2, LAPTOP.keyboardDepth),
  screen: new PlaneGeometry(LAPTOP.width * 0.92, LAPTOP.lidHeight * 0.88),
  back: new PlaneGeometry(LAPTOP.width * 0.96, LAPTOP.lidHeight * 0.96),
};

export function Laptop({ position, rotationY = 0 }: LaptopProps) {
  const materials = useMemo(
    () => ({
      shell: isLiteRender()
        ? new MeshStandardMaterial({ color: LAPTOP.shell, roughness: 0.32, metalness: 0.15 })
        : new MeshPhysicalMaterial({ color: LAPTOP.shell, roughness: 0.32, metalness: 0.15, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
      keyboard: new MeshStandardMaterial({ color: LAPTOP.keyboard, roughness: 0.55, metalness: 0 }),
      screen: new MeshBasicMaterial({ color: LAPTOP.screen, toneMapped: false }),
      stickers: new MeshBasicMaterial({ map: stickerTexture(), transparent: true, depthWrite: false }),
    }),
    [],
  );
  const lidCenter = -LAPTOP.lidHeight / 2;

  return (
    <group position={[...position]} rotation-y={rotationY}>
      <mesh geometry={geometry.base} material={materials.shell} position-y={LAPTOP.baseHeight / 2} />
      <mesh geometry={geometry.keyboard} material={materials.keyboard} position={[0, LAPTOP.baseHeight + 0.0008, -0.04]} rotation-x={-Math.PI / 2} />
      <group position={[0, LAPTOP.baseHeight, LAPTOP.depth / 2 - 0.012]} rotation-x={LAPTOP.openAngle}>
        <mesh geometry={geometry.lid} material={materials.shell} position={[0, LAPTOP.lidThickness / 2, lidCenter]} />
        <mesh geometry={geometry.screen} material={materials.screen} position={[0, -0.0008, lidCenter]} rotation-x={Math.PI / 2} />
        <mesh geometry={geometry.back} material={materials.stickers} position={[0, LAPTOP.lidThickness + 0.0008, lidCenter]} rotation-x={-Math.PI / 2} />
      </group>
    </group>
  );
}
