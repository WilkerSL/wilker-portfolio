import { useRef } from "react";
import { DukeModel } from "@/scene/mascots/duke/duke.model";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { playSfx } from "@/shared/audio/sfx.service";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { SectionHeading } from "@/shared/ui/section-heading/section-heading.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { ABOUT_CAMERA, ABOUT_DUKE_YAW } from "@/features/about/about.constants";

export function AboutMain() {
  const { content } = useLocale();
  const { about } = content;
  const scope = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const duke = useMascotPuppet({ rotY: ABOUT_DUKE_YAW });
  useReveal(scope);
  useMascotPresence(viewRef, [duke]);

  const poke = () => {
    duke.hop();
    playSfx("boing");
  };

  return (
    <section id={SECTION_IDS.about} ref={scope} className="section-space relative">
      <div className="page-container grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <SectionHeading title={about.title} />
          <div className="mt-8 grid gap-5 text-[length:var(--step-lead)] leading-relaxed">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div data-reveal className="relative pt-[8.5rem] lg:mt-6">
          <MascotView
            ref={viewRef}
            camera={ABOUT_CAMERA}
            className="absolute top-0 right-[8%] z-10 h-[11rem] w-[11rem] cursor-pointer"
            onPointerEnter={duke.wave}
            onClick={poke}
          >
            <CursorFollow element={viewRef} targets={[duke.state]} />
            <DukeModel state={duke.state} />
          </MascotView>
          <dl className="glass relative rounded-[var(--radius-card)] p-7 sm:p-9">
            {about.facts.map((fact, index) => (
              <div key={fact.label} className={`grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6 ${index > 0 ? "border-t border-line" : "pt-0"} ${index === about.facts.length - 1 ? "pb-0" : ""}`}>
                <dt className="text-[length:var(--step-small)] font-medium text-mute">{fact.label}</dt>
                <dd className="m-0 font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
