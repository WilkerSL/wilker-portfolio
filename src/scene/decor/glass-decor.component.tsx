import { Float } from "@react-three/drei";
import { useMemo } from "react";
import { CylinderGeometry, MeshPhysicalMaterial, MeshStandardMaterial, SphereGeometry, TorusGeometry } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { isLiteRender } from "@/scene/canvas/render-quality.util";
import { GLASS_DECOR } from "@/scene/decor/glass-decor.constants";
import type { GlassDeskProps, GlassPedestalProps } from "@/scene/decor/glass-decor.interfaces";

const geometry = {
  pedestal: new CylinderGeometry(GLASS_DECOR.pedestal.radius, GLASS_DECOR.pedestal.radius * 1.04, GLASS_DECOR.pedestal.height, 72, 1),
  cube: new RoundedBoxGeometry(0.5, 0.5, 0.5, 6, 0.13),
  ring: new TorusGeometry(0.32, 0.105, 32, 96),
  bead: new SphereGeometry(0.17, 48, 32),
  deskTop: new RoundedBoxGeometry(GLASS_DECOR.desk.width, GLASS_DECOR.desk.top, GLASS_DECOR.desk.depth, 4, 0.018),
  deskLeg: new RoundedBoxGeometry(GLASS_DECOR.desk.leg, GLASS_DECOR.desk.height - GLASS_DECOR.desk.top, GLASS_DECOR.desk.depth * 0.9, 4, 0.014),
};

function useGlass(opacity: number): MeshStandardMaterial {
  return useMemo(
    () =>
      isLiteRender()
        ? new MeshStandardMaterial({ color: GLASS_DECOR.color, roughness: 0.12, metalness: 0, transparent: true, opacity, envMapIntensity: 1.3 })
        : new MeshPhysicalMaterial({
        color: GLASS_DECOR.color,
        roughness: 0.08,
        metalness: 0,
        transparent: true,
        opacity,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        specularIntensity: 1,
        ior: 1.45,
        sheen: 0.4,
        sheenColor: GLASS_DECOR.sheen,
        envMapIntensity: 1.3,
      }),
    [opacity],
  );
}

export function GlassPedestal({ radius = GLASS_DECOR.pedestal.radius }: GlassPedestalProps) {
  const material = useGlass(GLASS_DECOR.pedestal.opacity);
  const spread = radius / GLASS_DECOR.pedestal.radius;

  return <mesh geometry={geometry.pedestal} material={material} position-y={-GLASS_DECOR.pedestal.height / 2} scale={[spread, 1, spread]} />;
}

export function GlassDesk({ position }: GlassDeskProps) {
  const material = useGlass(GLASS_DECOR.desk.opacity);
  const { width, height, top, leg } = GLASS_DECOR.desk;
  const legX = width / 2 - leg / 2;

  return (
    <group position={[...position]}>
      <mesh geometry={geometry.deskTop} material={material} position-y={height - top / 2} />
      <mesh geometry={geometry.deskLeg} material={material} position={[-legX, (height - top) / 2, 0]} />
      <mesh geometry={geometry.deskLeg} material={material} position={[legX, (height - top) / 2, 0]} />
    </group>
  );
}

export function GlassShapes() {
  const material = useGlass(GLASS_DECOR.shapeOpacity);

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={0.7}>
        <mesh geometry={geometry.cube} material={material} position={[...GLASS_DECOR.positions.cube]} rotation={[0.5, 0.6, 0.2]} />
      </Float>
      <Float speed={1.1} rotationIntensity={0.9} floatIntensity={0.9}>
        <mesh geometry={geometry.ring} material={material} position={[...GLASS_DECOR.positions.ring]} rotation={[1.1, 0.3, 0]} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh geometry={geometry.bead} material={material} position={[...GLASS_DECOR.positions.bead]} />
      </Float>
    </>
  );
}
