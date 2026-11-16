import { useEffect } from "react";
import { pointerState } from "@/shared/hooks/pointer.state";

function updatePointer(event: PointerEvent): void {
  pointerState.x = event.clientX;
  pointerState.y = event.clientY;
  pointerState.touch = event.pointerType === "touch";
  pointerState.inside = true;
}

export function usePointerTracking(): void {
  useEffect(() => {
    const onLeave = () => {
      pointerState.inside = false;
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", updatePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", updatePointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
}
