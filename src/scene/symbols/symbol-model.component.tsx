import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { BlobShadow } from "@/scene/mascots/shared/blob-shadow.component";
import { useModelAsset } from "@/scene/shared/use-model-asset.hook";
import type { SymbolModelProps } from "@/scene/symbols/symbol-model.interfaces";
import { SYMBOL_MOTION, SYMBOLS } from "@/scene/symbols/symbol.constants";
import { damp } from "@/shared/utils/math.util";

export function SymbolModel({ symbol, active }: SymbolModelProps) {
  const spec = SYMBOLS[symbol];
  const asset = useModelAsset(spec.url, { glow: spec.glow });
  const group = useRef<Group>(null);
  const spin = useRef<number>(SYMBOL_MOTION.idleSpin);

  useFrame((state, delta) => {
    if (group.current === null) {
      return;
    }
    const step = Math.min(delta, 1 / 20);
    spin.current = damp(spin.current, active.current ? SYMBOL_MOTION.activeSpin : SYMBOL_MOTION.idleSpin, SYMBOL_MOTION.spinDamping, step);
    group.current.rotation.y += spin.current * step;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * SYMBOL_MOTION.tilt;
    group.current.position.y = spec.lift + Math.sin(state.clock.elapsedTime * SYMBOL_MOTION.bobRate) * SYMBOL_MOTION.bob;
  });

  return (
    <>
      <BlobShadow size={1.3} opacity={0.22} />
      <group ref={group}>
        <primitive object={asset.scene} scale={spec.fit} />
      </group>
    </>
  );
}
