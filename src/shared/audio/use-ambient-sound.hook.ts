import { useEffect } from "react";
import { existingAudioEngine } from "@/shared/audio/audio-engine.service";
import { pauseAudio, startAmbient, stopAmbient } from "@/shared/audio/ambient.service";
import { useSoundStore } from "@/shared/audio/sound.store";

export function useAmbientSound(): void {
  const enabled = useSoundStore((state) => state.enabled);

  useEffect(() => {
    if (!enabled) {
      stopAmbient();
      return;
    }
    if (existingAudioEngine() !== null) {
      startAmbient();
    }
  }, [enabled]);

  useEffect(() => {
    const onVisibility = () => pauseAudio(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
}
