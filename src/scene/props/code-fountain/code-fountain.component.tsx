import codeFont from "@fontsource/monaspace-neon/files/monaspace-neon-latin-600-normal.woff?url";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
import { MathUtils, type Group } from "three";
import { createParticle, launchParticle, particleOpacity, particleScale, stepParticle } from "@/scene/props/code-fountain/code-fountain.animation";
import { CODE_CHARACTERS, CODE_TOKENS, CODE_TONE_COLOR, FOUNTAIN } from "@/scene/props/code-fountain/code-fountain.constants";
import type { CodeFountainProps, FadingText } from "@/scene/props/code-fountain/code-fountain.types";
import { ViewVisibilityContext } from "@/scene/views/view-visibility.context";

export function CodeFountain({ origin, spread, control }: CodeFountainProps) {
  const groups = useRef<(Group | null)[]>([]);
  const texts = useRef<(FadingText | null)[]>([]);
  const [particles] = useState(() => CODE_TOKENS.map(createParticle));
  const emitter = useRef({ wait: 0, burst: control.burst });
  const visible = useContext(ViewVisibilityContext);

  useFrame((_, delta) => {
    if (!visible.current) {
      return;
    }
    const step = Math.min(delta, FOUNTAIN.maxStep);
    const state = emitter.current;
    let launches = 0;
    if (control.rate > 0) {
      state.wait -= step * control.rate;
      if (state.wait <= 0) {
        launches += 1;
        state.wait = MathUtils.randFloat(FOUNTAIN.gapMin, FOUNTAIN.gapMax);
      }
    }
    const burst = Math.max(0, control.burst - state.burst);
    state.burst = control.burst;
    launches += burst;
    for (let launched = 0; launched < launches; launched += 1) {
      const idle = particles.filter((particle) => !particle.active);
      const pick = idle[Math.floor(Math.random() * idle.length)];
      if (pick === undefined) {
        break;
      }
      launchParticle(pick, spread, burst > 0 ? FOUNTAIN.burstBoost : 1);
    }
    particles.forEach((particle, index) => {
      const group = groups.current[index];
      if (group === null || group === undefined) {
        return;
      }
      if (particle.active) {
        stepParticle(particle, step);
      }
      group.visible = particle.active;
      if (!particle.active) {
        return;
      }
      group.position.set(particle.x, particle.y, particle.z);
      group.rotation.z = particle.angle;
      group.scale.setScalar(particleScale(particle));
      const text = texts.current[index];
      if (text !== null && text !== undefined) {
        text.fillOpacity = particleOpacity(particle);
      }
    });
  });

  return (
    <group position={[...origin]}>
      {CODE_TOKENS.map((token, index) => (
        <group
          key={token.text}
          visible={false}
          ref={(node) => {
            groups.current[index] = node;
          }}
        >
          <Text
            ref={(node: FadingText | null) => {
              texts.current[index] = node;
            }}
            font={codeFont}
            characters={CODE_CHARACTERS}
            fontSize={FOUNTAIN.fontSize}
            color={CODE_TONE_COLOR[token.tone]}
            anchorX="center"
            anchorY="middle"
          >
            {token.text}
          </Text>
        </group>
      ))}
    </group>
  );
}
