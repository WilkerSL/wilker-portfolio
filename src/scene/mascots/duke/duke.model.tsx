import { useCallback, useMemo } from "react";
import { DUKE_ARMS, DUKE_FIT, DUKE_FLIPPERS, DUKE_SHADOW, DUKE_TOY } from "@/scene/mascots/duke/duke.constants";
import { BlobShadow } from "@/scene/mascots/shared/blob-shadow.component";
import { poseFlippers } from "@/scene/mascots/shared/flipper-pose.animation";
import type { MascotModelProps } from "@/scene/mascots/shared/mascot-model.interfaces";
import type { MascotPair, MascotPose } from "@/scene/mascots/shared/mascot-rig.types";
import { useMascotRig } from "@/scene/mascots/shared/use-mascot-rig.hook";
import { MODEL_URL } from "@/scene/shared/model-assets.constants";
import { useModelAsset } from "@/scene/shared/use-model-asset.hook";

export function DukeModel({ state }: MascotModelProps) {
  const asset = useModelAsset(MODEL_URL.duke);
  const arms = useMemo<MascotPair>(() => [asset.node(DUKE_ARMS[0]), asset.node(DUKE_ARMS[1])], [asset]);
  const animate = useCallback((pose: MascotPose) => poseFlippers(arms, state, pose, DUKE_FLIPPERS), [arms, state]);
  const rig = useMascotRig(state, DUKE_TOY, animate);

  return (
    <group ref={rig.root}>
      <BlobShadow size={DUKE_SHADOW} ref={rig.shadow} />
      <group ref={rig.body}>
        <primitive object={asset.scene} scale={DUKE_FIT} />
      </group>
    </group>
  );
}
