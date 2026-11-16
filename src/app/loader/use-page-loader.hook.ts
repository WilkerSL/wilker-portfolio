import { useEffect } from "react";
import { PAGE_LOADER } from "@/app/loader/page-loader.constants";
import { finishLoader } from "@/app/loader/page-loader.util";
import { useSceneLoading } from "@/scene/loading/scene-loading.store";

export function usePageLoader(): void {
  useEffect(() => {
    const timer = window.setTimeout(() => useSceneLoading.getState().markReady(), PAGE_LOADER.timeoutMs);
    const stop = useSceneLoading.subscribe((state) => {
      if (state.ready) {
        finishLoader();
      }
    });
    if (useSceneLoading.getState().ready) {
      finishLoader();
    }
    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, []);
}
