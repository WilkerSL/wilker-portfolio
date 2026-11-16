import { useRef } from "react";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/animation/gsap.setup";
import { playSfx } from "@/shared/audio/sfx.service";
import { CastMascotModel } from "@/features/cast/cast-mascot-model.component";
import { CONTACT_CAMERA, CONTACT_LINEUP, CONTACT_WAVE_STAGGER } from "@/features/contact/contact.constants";

export function ContactLineup() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [first, second, third, fourth] = CONTACT_LINEUP;
  const puppets = [
    useMascotPuppet({ x: first?.x ?? 0, z: first?.z ?? 0, rotY: first?.rotY ?? 0 }),
    useMascotPuppet({ x: second?.x ?? 0, z: second?.z ?? 0, rotY: second?.rotY ?? 0 }),
    useMascotPuppet({ x: third?.x ?? 0, z: third?.z ?? 0, rotY: third?.rotY ?? 0 }),
    useMascotPuppet({ x: fourth?.x ?? 0, z: fourth?.z ?? 0, rotY: fourth?.rotY ?? 0 }),
  ];

  useMascotPresence(viewRef, puppets);

  const waveAll = () => {
    puppets.forEach((puppet, index) => gsap.delayedCall(index * CONTACT_WAVE_STAGGER, puppet.wave));
  };

  useGSAP(() => {
    const element = viewRef.current;
    if (element === null) {
      return;
    }
    ScrollTrigger.create({ trigger: element, start: "top 70%", once: true, onEnter: () => gsap.delayedCall(0.9, waveAll) });
  });

  const poke = () => {
    puppets.forEach((puppet, index) => gsap.delayedCall(index * 0.08, puppet.hop));
    playSfx("pop");
  };

  return (
    <MascotView ref={viewRef} camera={CONTACT_CAMERA} className="relative h-[clamp(16rem,30vw,24rem)] w-full cursor-pointer" onPointerEnter={waveAll} onClick={poke}>
      <CursorFollow element={viewRef} targets={puppets.map((puppet) => puppet.state)} />
      {CONTACT_LINEUP.map((spot, index) => {
        const puppet = puppets[index];
        return puppet === undefined ? null : <CastMascotModel key={spot.mascot} mascot={spot.mascot} state={puppet.state} />;
      })}
    </MascotView>
  );
}
