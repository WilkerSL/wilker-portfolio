import { useCallback, useMemo } from "react";
import type { MascotPose, MascotRigRefs, ToyMotion } from "@/scene/mascots/shared/mascot-rig.types";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import { applyRiggedPose, createRiggedRig } from "@/scene/mascots/shared/rigged-pose.animation";
import type { RiggedMotion } from "@/scene/mascots/shared/rigged-pose.types";
import { useMascotRig } from "@/scene/mascots/shared/use-mascot-rig.hook";
import type { ModelAsset } from "@/scene/shared/model-asset.types";

export function useRiggedMascot(asset: ModelAsset, state: MascotState, toy: ToyMotion, rigged: RiggedMotion): MascotRigRefs {
  const rig = useMemo(() => createRiggedRig(asset, rigged), [asset, rigged]);

  const extend = useCallback((pose: MascotPose) => applyRiggedPose(rig, pose, state, toy, rigged), [rig, state, toy, rigged]);

  return useMascotRig(state, toy, extend);
}
