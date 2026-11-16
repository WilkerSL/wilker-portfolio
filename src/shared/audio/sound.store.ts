import { create } from "zustand";
import { SFX_STORAGE_KEY } from "@/shared/audio/sfx.constants";
import type { SoundStore } from "@/shared/audio/sound.types";
import { readStorage, writeStorage } from "@/shared/utils/storage.util";

export const useSoundStore = create<SoundStore>((set, get) => ({
  enabled: readStorage(SFX_STORAGE_KEY) === "on",
  toggle() {
    const enabled = !get().enabled;
    writeStorage(SFX_STORAGE_KEY, enabled ? "on" : "off");
    set({ enabled });
  },
}));
