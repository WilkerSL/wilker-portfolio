import { useRef, useState, type MouseEvent } from "react";
import { GlassDesk, GlassPedestal, GlassShapes } from "@/scene/decor/glass-decor.component";
import { useSceneLoading } from "@/scene/loading/scene-loading.store";
import { GopherModel } from "@/scene/mascots/gopher/gopher.model";
import { PUPPET_ENTER } from "@/scene/mascots/shared/mascot-puppet.constants";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { CodeFountain } from "@/scene/props/code-fountain/code-fountain.component";
import type { FountainControl } from "@/scene/props/code-fountain/code-fountain.types";
import { Laptop } from "@/scene/props/laptop/laptop.component";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { gsap, useGSAP } from "@/shared/animation/gsap.setup";
import { scrollToSection } from "@/shared/animation/scroll-to.util";
import { playSfx } from "@/shared/audio/sfx.service";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { Button } from "@/shared/ui/button/button.component";
import { Chip } from "@/shared/ui/chip/chip.component";
import { ArrowIcon } from "@/shared/ui/icons/arrow-icon.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { prefersReducedMotion } from "@/shared/utils/device.util";
import { HERO_CAMERA, HERO_FOUNTAIN, HERO_SCENE, HERO_STACK, HERO_TIMING } from "@/features/hero/hero.constants";

function goTo(id: string) {
  return (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    scrollToSection(id);
  };
}

export function HeroMain() {
  const { content } = useLocale();
  const { hero } = content;
  const scope = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const gopher = useMascotPuppet({ z: HERO_SCENE.gopherZ });
  const [fountain] = useState<FountainControl>(() => ({ rate: 0, burst: 0 }));
  const ready = useSceneLoading((loading) => loading.ready);
  useMascotPresence(viewRef, [gopher], false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gopher.state.type = 1;
        return;
      }
      gopher.state.scale = PUPPET_ENTER.hidden;
      if (!ready) {
        return;
      }
      gsap
        .timeline({ delay: 0.1 })
        .from("[data-hero-line]", { yPercent: 115, duration: 1.1, ease: "mass", stagger: 0.09 })
        .from("[data-hero-fade]", { opacity: 0, y: 18, duration: 0.9, ease: "mass", stagger: 0.07 }, 0.25)
        .from("[data-hero-art]", { opacity: 0, y: 30, scale: 0.98, duration: 1.2, ease: "mass" }, 0.2)
        .call(gopher.enter, [], 0.45)
        .call(gopher.wave, [], HERO_TIMING.greet)
        .to(gopher.state, { type: 1, duration: HERO_TIMING.typeIn, ease: "power2.inOut" }, HERO_TIMING.type)
        .to(fountain, { rate: HERO_FOUNTAIN.rate, duration: HERO_TIMING.fountainIn, ease: "power1.in" }, HERO_TIMING.type + HERO_TIMING.typeIn * 0.5);
    },
    { scope, dependencies: [ready] },
  );

  const poke = () => {
    gopher.hop();
    if (!prefersReducedMotion()) {
      fountain.burst += HERO_FOUNTAIN.burst;
    }
    playSfx("squeak");
  };

  return (
    <section id={SECTION_IDS.hero} ref={scope} className="relative overflow-hidden pt-[clamp(7.5rem,16vh,11rem)] pb-[var(--section-space)]">
      <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_35%,black,transparent)]" />
      <div aria-hidden="true" className="accent-orb top-[-14rem] right-[-12rem] h-[44rem] w-[44rem] opacity-60" />
      <div className="page-container relative grid items-center gap-y-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-10">
        <div>
          <h1 className="font-display text-[length:var(--step-display)] leading-[0.94] font-[760] tracking-[-0.035em]" style={{ fontStretch: "112%" }}>
            <span className="sr-only">{`${hero.firstName} ${hero.lastName}, ${hero.role}`}</span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                {hero.firstName}
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                {hero.lastName}
                <span className="text-accent">.</span>
              </span>
            </span>
          </h1>
          <p data-hero-fade className="mt-7 max-w-[34rem] text-[length:var(--step-lead)] leading-relaxed">
            {hero.line}
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={`#${SECTION_IDS.projects}`} onClick={goTo(SECTION_IDS.projects)}>
              {hero.primaryCta}
              <ArrowIcon />
            </Button>
            <Button variant="glass" href={`#${SECTION_IDS.contact}`} onClick={goTo(SECTION_IDS.contact)}>
              {hero.secondaryCta}
            </Button>
          </div>
          <div data-hero-fade className="mt-12 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[length:var(--step-small)] text-mute">{hero.stackLabel}</span>
            {HERO_STACK.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
        <div data-hero-art className="relative mx-auto w-full max-w-[34rem]">
          <MascotView ref={viewRef} camera={HERO_CAMERA} className="relative aspect-square w-full cursor-pointer" onPointerEnter={gopher.wave} onClick={poke}>
            <CursorFollow element={viewRef} targets={[gopher.state]} />
            <GlassPedestal radius={HERO_SCENE.pedestal} />
            <GlassShapes />
            <GlassDesk position={HERO_SCENE.desk} />
            <Laptop position={HERO_SCENE.laptop} />
            <GopherModel state={gopher.state} />
            <CodeFountain origin={HERO_SCENE.fountain} spread={HERO_SCENE.fountainSpread} control={fountain} />
          </MascotView>
        </div>
      </div>
    </section>
  );
}
