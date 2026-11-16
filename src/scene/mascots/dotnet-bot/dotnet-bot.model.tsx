import { DOTNET_FIT, DOTNET_RIG, DOTNET_SHADOW, DOTNET_TOY } from "@/scene/mascots/dotnet-bot/dotnet-bot.constants";
import { BlobShadow } from "@/scene/mascots/shared/blob-shadow.component";
import type { MascotModelProps } from "@/scene/mascots/shared/mascot-model.interfaces";
import { useRiggedMascot } from "@/scene/mascots/shared/use-rigged-mascot.hook";
import { MODEL_URL } from "@/scene/shared/model-assets.constants";
import { useModelAsset } from "@/scene/shared/use-model-asset.hook";

export function DotnetBotModel({ state }: MascotModelProps) {
  const asset = useModelAsset(MODEL_URL.dotnetBot);
  const rig = useRiggedMascot(asset, state, DOTNET_TOY, DOTNET_RIG);

  return (
    <group ref={rig.root}>
      <BlobShadow size={DOTNET_SHADOW} ref={rig.shadow} />
      <group ref={rig.body}>
        <primitive object={asset.scene} scale={DOTNET_FIT} />
      </group>
    </group>
  );
}
