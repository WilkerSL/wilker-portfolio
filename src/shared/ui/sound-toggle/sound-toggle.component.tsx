import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/animation/gsap.setup";
import { playSfx, unlockAudio } from "@/shared/audio/sfx.service";
import { useSoundStore } from "@/shared/audio/sound.store";
import type { SoundToggleProps } from "@/shared/ui/sound-toggle/sound-toggle.interfaces";

const BARS = [0, 1, 2, 3];

export function SoundToggle({ labelOn, labelOff }: SoundToggleProps) {
  const enabled = useSoundStore((state) => state.enabled);
  const toggle = useSoundStore((state) => state.toggle);
  const barsRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const bars = barsRef.current?.children;
      if (bars === undefined) {
        return;
      }
      if (!enabled) {
        gsap.to(bars, { scaleY: 0.25, duration: 0.3, ease: "power2.out", overwrite: true });
        return;
      }
      gsap.to(bars, {
        scaleY: () => gsap.utils.random(0.35, 1),
        duration: 0.26,
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
        stagger: 0.07,
        overwrite: true,
      });
    },
    { dependencies: [enabled] },
  );

  const onClick = () => {
    toggle();
    window.setTimeout(() => {
      unlockAudio();
      playSfx("chime");
    }, 0);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      aria-label={enabled ? labelOn : labelOff}
      title={enabled ? labelOn : labelOff}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white ${enabled ? "text-accent-strong" : "text-mute hover:text-ink"}`}
    >
      <span ref={barsRef} aria-hidden="true" className="inline-flex h-3 items-end gap-[2px]">
        {BARS.map((bar) => (
          <span key={bar} className="block h-full w-[2px] origin-bottom scale-y-25 bg-current" />
        ))}
      </span>
    </button>
  );
}
