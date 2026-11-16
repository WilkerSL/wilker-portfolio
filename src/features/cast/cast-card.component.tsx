import { useRef } from "react";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { SymbolModel } from "@/scene/symbols/symbol-model.component";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { playSfx } from "@/shared/audio/sfx.service";
import { Chip } from "@/shared/ui/chip/chip.component";
import { CastMascotModel } from "@/features/cast/cast-mascot-model.component";
import { CAST_CAMERA, CAST_POKE_SOUND, CAST_VISUAL, CAST_YAW, PROFICIENCY_TONE } from "@/features/cast/cast.constants";
import type { CastCardProps } from "@/features/cast/cast.interfaces";

export function CastCard({ member, proficiencyLabel }: CastCardProps) {
  const visual = CAST_VISUAL[member.id];
  const viewRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const puppet = useMascotPuppet({ rotY: CAST_YAW });
  useMascotPresence(viewRef, [puppet]);

  const enter = () => {
    active.current = true;
    puppet.wave();
  };

  const leave = () => {
    active.current = false;
  };

  const poke = () => {
    puppet.hop();
    playSfx(CAST_POKE_SOUND[member.id]);
  };

  return (
    <article
      data-reveal
      onPointerEnter={enter}
      onPointerLeave={leave}
      className="group glass relative flex flex-col rounded-[var(--radius-card)] p-5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-mass)] hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0_0_1px_rgb(0_173_216/0.18),0_30px_60px_-32px_rgb(0_173_216/0.45)]"
    >
      <div className="relative h-[15rem] overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgb(214_242_250/0.95),rgb(247_247_248/0.6)_60%,transparent)]">
        <MascotView ref={viewRef} camera={CAST_CAMERA[member.id]} className="absolute inset-0 cursor-pointer" onClick={poke}>
          {visual.kind === "mascot" ? (
            <>
              <CursorFollow element={viewRef} targets={[puppet.state]} />
              <CastMascotModel mascot={visual.mascot} state={puppet.state} />
            </>
          ) : (
            <SymbolModel symbol={visual.symbol} active={active} />
          )}
        </MascotView>
      </div>
      <div className="mt-5 flex items-start justify-between gap-3 px-1">
        <h3 className="text-[length:var(--step-heading)] leading-tight font-[700] tracking-[-0.015em]" style={{ fontStretch: "106%" }}>
          {member.name}
        </h3>
        <Chip tone={PROFICIENCY_TONE[member.proficiency]}>{proficiencyLabel}</Chip>
      </div>
      <p className="mt-2 px-1 text-mute">{member.summary}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 px-1 pt-5">
        {member.techs.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </article>
  );
}
