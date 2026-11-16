import { MeshPhysicalMaterial, MeshStandardMaterial, type Material } from "three";
import { isLiteRender } from "@/scene/canvas/render-quality.util";

const skinCache = new WeakMap<Material, MeshStandardMaterial>();

export function vinylSkinMaterial(source: Material): MeshStandardMaterial {
  const cached = skinCache.get(source);
  if (cached !== undefined) {
    return cached;
  }
  const map = (source as MeshStandardMaterial).map ?? null;
  if (map !== null) {
    map.anisotropy = isLiteRender() ? 4 : 8;
  }
  const material = isLiteRender()
    ? new MeshStandardMaterial({ map, roughness: 0.42, metalness: 0 })
    : new MeshPhysicalMaterial({ map, roughness: 0.36, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.22, specularIntensity: 0.6 });
  skinCache.set(source, material);
  return material;
}
