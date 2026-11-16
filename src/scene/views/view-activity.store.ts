import { create } from "zustand";
import type { ViewActivityStore } from "@/scene/views/view-activity.types";

export const useViewActivity = create<ViewActivityStore>((set) => ({
  visible: 0,
  show: () => set((state) => ({ visible: state.visible + 1 })),
  hide: () => set((state) => ({ visible: Math.max(0, state.visible - 1) })),
}));
