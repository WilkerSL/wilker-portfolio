import { create } from "zustand";
import type { SceneLoadingStore } from "@/scene/loading/scene-loading.types";

export const useSceneLoading = create<SceneLoadingStore>((set) => ({
  ready: false,
  markReady: () => set({ ready: true }),
}));
