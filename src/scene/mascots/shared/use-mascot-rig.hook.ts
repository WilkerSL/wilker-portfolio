import { useFrame } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import type { MascotPoseHook, MascotRigRefs, ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";
import { TOY_LIMITS } from "@/scene/mascots/shared/toy-motion.constants";
import { applyToyPose, createToyClock, placeRoot } from "@/scene/mascots/shared/toy-pose.animation";
import { ViewVisibilityContext } from "@/scene/views/view-visibility.context";

export function useMascotRig(state: MascotState, motion: ToyMotion, extend?: MascotPoseHook): MascotRigRefs {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const shadow = useRef<Mesh>(null);
  const [clock] = useState(createToyClock);
  const visible = useContext(ViewVisibilityContext);

  useFrame((frame, delta) => {
    if (!visible.current || root.current === null || body.current === null || shadow.current === null) {
      return;
    }
    const rig = { root: root.current, body: body.current, shadow: shadow.current };
    if (!placeRoot(rig, state, clock)) {
      return;
    }
    const pose = applyToyPose(rig, state, motion, clock, frame.clock.elapsedTime, Math.min(delta, TOY_LIMITS.maxStep));
    extend?.(pose);
  });

  return { root, body, shadow };
}
