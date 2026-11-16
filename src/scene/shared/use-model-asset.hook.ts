import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Color, type Mesh, type MeshStandardMaterial, type Object3D } from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { vinylSkinMaterial } from "@/scene/materials/vinyl.material";
import type { ModelAsset, ModelAssetOptions } from "@/scene/shared/model-asset.types";

const glowCache = new Map<string, MeshStandardMaterial>();

function glowing(material: MeshStandardMaterial, url: string, glow: number): MeshStandardMaterial {
  const key = `${url}|${glow}`;
  const cached = glowCache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const result = material.clone();
  result.emissive = new Color("#ffffff");
  result.emissiveMap = material.map;
  result.emissiveIntensity = glow;
  glowCache.set(key, result);
  return result;
}

export function useModelAsset(url: string, options: ModelAssetOptions = {}): ModelAsset {
  const gltf = useGLTF(url, false, true);
  const glow = options.glow ?? 0;

  return useMemo(() => {
    const scene = clone(gltf.scene);
    scene.traverse((object) => {
      const mesh = object as Mesh;
      const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (mesh.isMesh && source !== undefined) {
        const material = vinylSkinMaterial(source);
        mesh.material = glow > 0 ? glowing(material, url, glow) : material;
        mesh.frustumCulled = false;
      }
    });
    const node = (name: string): Object3D => {
      const found = scene.getObjectByName(name);
      if (found === undefined) {
        throw new Error(`missing node ${name} in ${url}`);
      }
      return found;
    };
    return { scene, clips: gltf.animations, node };
  }, [gltf, url, glow]);
}

export function preloadModels(urls: readonly string[]): void {
  for (const url of urls) {
    useGLTF.preload(url, false, true);
  }
}
