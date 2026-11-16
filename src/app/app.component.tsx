import { Suspense } from "react";
import { Outlet } from "react-router";
import { usePageLoader } from "@/app/loader/use-page-loader.hook";
import { SceneCanvas } from "@/scene/canvas/scene-canvas.component";
import { MODEL_URLS } from "@/scene/shared/model-assets.constants";
import { preloadModels } from "@/scene/shared/use-model-asset.hook";
import { unlockAudio } from "@/shared/audio/sfx.service";
import { useAmbientSound } from "@/shared/audio/use-ambient-sound.hook";
import { usePointerTracking } from "@/shared/hooks/use-pointer-tracking.hook";

preloadModels(MODEL_URLS);

export function AppShell() {
  usePointerTracking();
  useAmbientSound();
  usePageLoader();

  return (
    <div onPointerDown={unlockAudio}>
      <Outlet />
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>
    </div>
  );
}
