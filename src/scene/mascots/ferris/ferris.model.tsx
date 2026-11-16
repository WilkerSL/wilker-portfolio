import { useCallback, useMemo, useState } from "react";
import { FERRIS_CLAWS, FERRIS_CRAB, FERRIS_EYES, FERRIS_FIT, FERRIS_LEGS, FERRIS_SHADOW, FERRIS_TOY } from "@/scene/mascots/ferris/ferris.constants";
import { poseCrab } from "@/scene/mascots/ferris/ferris-pose.animation";
import type { BlinkClock, CrabParts } from "@/scene/mascots/ferris/ferris.types";
import { BlobShadow } from "@/scene/mascots/shared/blob-shadow.component";
import type { MascotModelProps } from "@/scene/mascots/shared/mascot-model.interfaces";
import type { MascotPose } from "@/scene/mascots/shared/mascot-rig.types";
import { useMascotRig } from "@/scene/mascots/shared/use-mascot-rig.hook";
import { MODEL_URL } from "@/scene/shared/model-assets.constants";
import { useModelAsset } from "@/scene/shared/use-model-asset.hook";

export function FerrisModel({ state }: MascotModelProps) {
  const asset = useModelAsset(MODEL_URL.ferris);
  const parts = useMemo<CrabParts>(
    () => ({
      eyes: FERRIS_EYES.map((name) => asset.node(name)),
      claws: [asset.node(FERRIS_CLAWS[0]), asset.node(FERRIS_CLAWS[1])],
      legs: FERRIS_LEGS.map((name) => asset.node(name)),
    }),
    [asset],
  );
  const [blink] = useState<BlinkClock>(() => ({ next: 1 + Math.random() * 3, until: 0 }));
  const animate = useCallback((pose: MascotPose) => poseCrab(parts, state, pose, FERRIS_CRAB, blink), [parts, state, blink]);
  const rig = useMascotRig(state, FERRIS_TOY, animate);

  return (
    <group ref={rig.root}>
      <BlobShadow size={FERRIS_SHADOW} ref={rig.shadow} />
      <group ref={rig.body}>
        <primitive object={asset.scene} scale={FERRIS_FIT} />
      </group>
    </group>
  );
}
