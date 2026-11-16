import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { Vector3 } from "three";
import { CURSOR_FOLLOW } from "@/scene/views/cursor-follow.constants";
import type { CursorFollowProps } from "@/scene/views/mascot-view.interfaces";
import { ViewVisibilityContext } from "@/scene/views/view-visibility.context";
import { pointerState } from "@/shared/hooks/pointer.state";
import { clamp } from "@/shared/utils/math.util";

const anchor = new Vector3();

export function CursorFollow({ element, targets }: CursorFollowProps) {
  const camera = useThree((state) => state.camera);
  const lastTop = useRef<number | null>(null);
  const visible = useContext(ViewVisibilityContext);

  useFrame((_, delta) => {
    if (!visible.current) {
      lastTop.current = null;
      return;
    }
    const rect = element.current?.getBoundingClientRect();
    if (rect === undefined) {
      return;
    }
    const moved = lastTop.current === null ? 0 : rect.top - lastTop.current;
    lastTop.current = rect.top;
    const drag = clamp(moved / Math.max(delta, 1 / 240) / CURSOR_FOLLOW.dragSpeed, -1, 1) * CURSOR_FOLLOW.drag;
    const tracking = pointerState.inside && !pointerState.touch;
    const reach = Math.max(CURSOR_FOLLOW.minReach, rect.width * CURSOR_FOLLOW.reachScale);

    for (const target of targets) {
      target.drag = drag;
      if (!tracking) {
        target.lookX = 0;
        target.lookY = 0;
        continue;
      }
      anchor.set(target.x, target.y + CURSOR_FOLLOW.eyeHeight, target.z).project(camera);
      const screenX = rect.left + ((anchor.x + 1) / 2) * rect.width;
      const screenY = rect.top + ((1 - anchor.y) / 2) * rect.height;
      target.lookX = Math.tanh((pointerState.x - screenX) / reach);
      target.lookY = Math.tanh((pointerState.y - screenY) / reach);
    }
  });

  return null;
}
