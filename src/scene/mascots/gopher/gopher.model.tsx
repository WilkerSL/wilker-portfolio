import { GOPHER_FIT, GOPHER_RIG, GOPHER_SHADOW, GOPHER_TOY } from "@/scene/mascots/gopher/gopher.constants";
import { BlobShadow } from "@/scene/mascots/shared/blob-shadow.component";
import type { MascotModelProps } from "@/scene/mascots/shared/mascot-model.interfaces";
import { useRiggedMascot } from "@/scene/mascots/shared/use-rigged-mascot.hook";
import { MODEL_URL } from "@/scene/shared/model-assets.constants";
import { useModelAsset } from "@/scene/shared/use-model-asset.hook";

export function GopherModel({ state }: MascotModelProps) {
  const asset = useModelAsset(MODEL_URL.gopher);
  const rig = useRiggedMascot(asset, state, GOPHER_TOY, GOPHER_RIG);

  return (
    <group ref={rig.root}>
      <BlobShadow size={GOPHER_SHADOW} ref={rig.shadow} />
      <group ref={rig.body}>
        <primitive object={asset.scene} scale={GOPHER_FIT} />
      </group>
    </group>
  );
}
