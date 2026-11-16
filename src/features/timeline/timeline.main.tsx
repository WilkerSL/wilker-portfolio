import { useRef } from "react";
import { TimelineBranch } from "@/core/enums/timeline-branch.enum";
import { FerrisModel } from "@/scene/mascots/ferris/ferris.model";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { gsap, useGSAP } from "@/shared/animation/gsap.setup";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { playSfx } from "@/shared/audio/sfx.service";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { Chip } from "@/shared/ui/chip/chip.component";
import { SectionHeading } from "@/shared/ui/section-heading/section-heading.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { prefersReducedMotion } from "@/shared/utils/device.util";
import { TIMELINE_CAMERA, TIMELINE_FERRIS_YAW, TIMELINE_WALK } from "@/features/timeline/timeline.constants";

export function TimelineMain() {
  const { content } = useLocale();
  const { timeline } = content;
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const ferris = useMascotPuppet({ rotY: TIMELINE_FERRIS_YAW });
  useReveal(scope);
  useMascotPresence(viewRef, [ferris]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const walker = walkerRef.current;
      if (track === null || walker === null || prefersReducedMotion()) {
        return;
      }
      const media = gsap.matchMedia();
      media.add(TIMELINE_WALK.media, () => {
        const walkTo = gsap.quickTo(ferris.state, "walk", { duration: TIMELINE_WALK.settle, ease: "power2.out" });
        gsap.fromTo(
          walker,
          { y: 0 },
          {
            y: () => Math.max(0, track.offsetHeight - walker.offsetHeight),
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: TIMELINE_WALK.start,
              end: TIMELINE_WALK.end,
              scrub: TIMELINE_WALK.scrub,
              invalidateOnRefresh: true,
              onUpdate: (self) => walkTo(Math.min(1, Math.abs(self.getVelocity()) / TIMELINE_WALK.speed)),
              onScrubComplete: () => walkTo(0),
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope },
  );

  const poke = () => {
    ferris.hop();
    playSfx("clack");
  };

  return (
    <section id={SECTION_IDS.path} ref={scope} className="section-space relative bg-snow">
      <div className="page-container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading title={timeline.title} />
          <p data-reveal className="mt-6 font-mono text-[length:var(--step-small)] text-mute">
            <span className="text-accent-strong">$</span> {timeline.command}
          </p>
        </div>
        <div ref={trackRef} className="relative">
          <div ref={walkerRef} className="absolute top-0 left-[-6.4rem] z-10 hidden h-[7rem] w-[7rem] lg:block">
            <MascotView ref={viewRef} camera={TIMELINE_CAMERA} className="absolute inset-0 cursor-pointer" onPointerEnter={ferris.wave} onClick={poke}>
              <CursorFollow element={viewRef} targets={[ferris.state]} />
              <FerrisModel state={ferris.state} />
            </MascotView>
          </div>
          <ol className="relative m-0 grid list-none gap-5 p-0 before:absolute before:top-3 before:bottom-3 before:left-[0.6rem] before:w-px before:bg-line-strong">
            {timeline.commits.map((commit) => (
              <li key={commit.hash} data-reveal className="relative pl-10">
                <span aria-hidden="true" className="absolute top-7 left-0 h-5 w-5 rounded-full border-4 border-snow bg-accent shadow-[0_0_0_1px_rgb(0_173_216/0.3)]" />
                <article className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-[length:var(--step-micro)] text-faint">
                    <span className="font-medium text-ink">{commit.year}</span>
                    <Chip tone={commit.branch === TimelineBranch.Work ? "accent" : "neutral"}>{timeline.branchLabels[commit.branch]}</Chip>
                    <span>{commit.hash}</span>
                  </div>
                  <h3 className="mt-3 text-[length:var(--step-heading)] leading-snug font-[700] tracking-[-0.01em]">{commit.message}</h3>
                  <p className="mt-1.5 text-mute">{commit.detail}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
