import { useRef } from "react";
import { useParams } from "react-router";
import { GlassPedestal } from "@/scene/decor/glass-decor.component";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { SymbolModel } from "@/scene/symbols/symbol-model.component";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { caseStudyPath, homePath } from "@/shared/i18n/locale-path.util";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { Button } from "@/shared/ui/button/button.component";
import { Chip } from "@/shared/ui/chip/chip.component";
import { ArrowIcon } from "@/shared/ui/icons/arrow-icon.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { TextLink } from "@/shared/ui/text-link/text-link.component";
import { CastMascotModel } from "@/features/cast/cast-mascot-model.component";
import { CaseStudySectionBlock } from "@/features/case-study/case-study-section.component";
import { CASE_CAMERA, CASE_VISUAL, CASE_YAW } from "@/features/case-study/case-study.constants";
import { NotFoundMain } from "@/features/not-found/not-found.main";

export function CaseStudyMain() {
  const { slug } = useParams();
  const { locale, content } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const puppet = useMascotPuppet({ rotY: CASE_YAW });
  const study = content.caseStudies.find((item) => item.slug === slug);
  useReveal(rootRef);
  useMascotPresence(viewRef, [puppet]);

  if (study === undefined) {
    return <NotFoundMain />;
  }

  const visual = CASE_VISUAL[study.projectId];

  return (
    <article ref={rootRef} className="relative overflow-hidden pt-[clamp(7.5rem,15vh,10rem)] pb-[var(--section-space)]">
      <div aria-hidden="true" className="accent-orb top-[-12rem] right-[-10rem] h-[38rem] w-[38rem] opacity-50" />
      <header className="page-container relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p data-reveal className="text-[length:var(--step-small)] font-medium text-accent-strong">
            {content.projects.caseStudyLabel}
          </p>
          <h1 data-reveal className="mt-5 text-[length:var(--step-title)] leading-[1.02] font-[760] tracking-[-0.03em]" style={{ fontStretch: "110%" }}>
            {study.title}
          </h1>
          <p data-reveal className="mt-6 max-w-[40rem] text-[length:var(--step-lead)] leading-relaxed">
            {study.summary}
          </p>
          <div data-reveal className="mt-7 flex flex-wrap gap-1.5">
            {study.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {study.links.map((link, index) =>
              index === 0 ? (
                <Button key={link.href} href={link.href} external={link.external}>
                  {link.label}
                  <ArrowIcon />
                </Button>
              ) : (
                <TextLink key={link.href} href={link.href} external={link.external} className="font-mono text-[length:var(--step-small)] font-medium text-ink">
                  {link.label}
                </TextLink>
              ),
            )}
          </div>
        </div>
        <div data-reveal className="glass-tint relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-[2rem]">
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
          <MascotView
            ref={viewRef}
            camera={CASE_CAMERA}
            className="absolute inset-0 cursor-pointer"
            onPointerEnter={() => {
              active.current = true;
              puppet.wave();
            }}
            onClick={puppet.hop}
          >
            <GlassPedestal />
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
      </header>
      <div className="page-container relative">
        <div className="max-w-[46rem]">
          {study.sections.map((section) => (
            <CaseStudySectionBlock key={section.id} section={section} locale={locale} />
          ))}
        </div>
        <nav className="mt-[clamp(4rem,8vw,7rem)] flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-10">
          {study.nextSlug !== null && (
            <Button to={caseStudyPath(locale, study.nextSlug)}>
              {study.nextLabel}
              <ArrowIcon />
            </Button>
          )}
          <TextLink href={`${homePath(locale)}#${SECTION_IDS.projects}`} className="font-mono text-[length:var(--step-small)] text-mute">
            {content.ui.backHome}
          </TextLink>
        </nav>
      </div>
    </article>
  );
}
