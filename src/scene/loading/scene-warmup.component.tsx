import codeFont from "@fontsource/monaspace-neon/files/monaspace-neon-latin-600-normal.woff?url";
import { Text, useProgress } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PerspectiveCamera, Scene, type Material, type Mesh, type Texture } from "three";
import { setLoaderProgress } from "@/app/loader/page-loader.util";
import { GlassDesk, GlassPedestal, GlassShapes } from "@/scene/decor/glass-decor.component";
import { StudioLights } from "@/scene/lighting/studio-lights.component";
import { useSceneLoading } from "@/scene/loading/scene-loading.store";
import type { WarmupContentProps } from "@/scene/loading/scene-loading.types";
import { WARMUP } from "@/scene/loading/scene-warmup.constants";
import { DotnetBotModel } from "@/scene/mascots/dotnet-bot/dotnet-bot.model";
import { DukeModel } from "@/scene/mascots/duke/duke.model";
import { FerrisModel } from "@/scene/mascots/ferris/ferris.model";
import { GopherModel } from "@/scene/mascots/gopher/gopher.model";
import { createMascotState } from "@/scene/mascots/shared/mascot-state.util";
import { CODE_CHARACTERS } from "@/scene/props/code-fountain/code-fountain.constants";
import { Laptop } from "@/scene/props/laptop/laptop.component";
import { SymbolId } from "@/scene/symbols/symbol-id.enum";
import { SymbolModel } from "@/scene/symbols/symbol-model.component";

const ORIGIN = [0, 0, 0] as const;
const IDLE = { current: false };

function warmupCamera(): PerspectiveCamera {
  const { fov, near, far, position, target } = WARMUP.camera;
  const camera = new PerspectiveCamera(fov, 1, near, far);
  camera.position.set(...position);
  camera.lookAt(...target);
  camera.updateMatrixWorld();
  return camera;
}

function sceneTextures(scene: Scene): Texture[] {
  const textures = new Set<Texture>();
  scene.traverse((object) => {
    const material = (object as Mesh).material;
    const materials: Material[] = Array.isArray(material) ? material : material === undefined ? [] : [material];
    for (const entry of materials) {
      for (const key of WARMUP.textureKeys) {
        const texture = (entry as unknown as Record<string, Texture | null | undefined>)[key];
        if (texture?.isTexture === true) {
          textures.add(texture);
        }
      }
    }
  });
  return [...textures];
}

function WarmupContent({ onReady }: WarmupContentProps) {
  const [state] = useState(() => createMascotState());
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (synced) {
      onReady();
    }
  }, [synced, onReady]);

  return (
    <>
      <StudioLights />
      <GopherModel state={state} />
      <DukeModel state={state} />
      <DotnetBotModel state={state} />
      <FerrisModel state={state} />
      {Object.values(SymbolId).map((symbol) => (
        <SymbolModel key={symbol} symbol={symbol} active={IDLE} />
      ))}
      <GlassPedestal />
      <GlassShapes />
      <GlassDesk position={ORIGIN} />
      <Laptop position={ORIGIN} />
      <Text font={codeFont} characters={CODE_CHARACTERS} fontSize={0.1} onSync={() => setSynced(true)}>
        func
      </Text>
    </>
  );
}

export function SceneWarmup() {
  const gl = useThree((three) => three.gl);
  const [scene] = useState(() => new Scene());
  const [camera] = useState(warmupCamera);
  const [done, setDone] = useState(false);
  const progress = useProgress((loading) => loading.progress);
  const markReady = useSceneLoading((loading) => loading.markReady);

  useEffect(() => {
    setLoaderProgress((WARMUP.loadShare * progress) / 100);
  }, [progress]);

  const compile = useCallback(() => {
    setLoaderProgress(WARMUP.loadShare);
    void gl
      .compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        setLoaderProgress(WARMUP.compileShare);
        for (const texture of sceneTextures(scene)) {
          gl.initTexture(texture);
        }
        markReady();
        setDone(true);
      });
  }, [gl, scene, camera, markReady]);

  if (done) {
    return null;
  }

  return createPortal(
    <Suspense fallback={null}>
      <WarmupContent onReady={compile} />
    </Suspense>,
    scene,
  );
}
