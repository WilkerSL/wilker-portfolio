import { useRef } from "react";
import { useMascotPuppet } from "@/scene/mascots/shared/use-mascot-puppet.hook";
import { useMascotPresence } from "@/scene/mascots/shared/use-mascot-presence.hook";
import { SymbolModel } from "@/scene/symbols/symbol-model.component";
import { CursorFollow } from "@/scene/views/cursor-follow.component";
import { MascotView } from "@/scene/views/mascot-view.component";
import { caseStudyPath } from "@/shared/i18n/locale-path.util";
import { Button } from "@/shared/ui/button/button.component";
import { Chip } from "@/shared/ui/chip/chip.component";
import { ArrowIcon } from "@/shared/ui/icons/arrow-icon.component";
import { TextLink } from "@/shared/ui/text-link/text-link.component";
import { CastMascotModel } from "@/features/cast/cast-mascot-model.component";
import { PROJECT_CAMERA, PROJECT_VISUAL, PROJECT_YAW } from "@/features/projects/projects.constants";
import type { ProjectCardProps } from "@/features/projects/projects.interfaces";

export function ProjectCard({ project, locale, caseStudyLabel, reversed }: ProjectCardProps) {
  const visual = PROJECT_VISUAL[project.id];
  const viewRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const puppet = useMascotPuppet({ rotY: PROJECT_YAW });
  useMascotPresence(viewRef, [puppet]);

  const enter = () => {
    active.current = true;
    puppet.wave();
  };

  const leave = () => {
    active.current = false;
  };

  return (
    <article data-reveal onPointerEnter={enter} onPointerLeave={leave} className="glass grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.25fr_0.75fr]">
      <div className={`p-7 sm:p-10 ${reversed ? "lg:order-2" : ""}`}>
        <p className="font-mono text-[length:var(--step-small)] font-medium text-accent-strong">{project.index}</p>
        <h3 className="mt-2 text-[length:clamp(1.6rem,2.6vw,2.4rem)] leading-tight font-[740] tracking-[-0.02em]" style={{ fontStretch: "108%" }}>
          {project.name}
        </h3>
        <p className="mt-4 max-w-[38rem] text-[length:var(--step-lead)] leading-relaxed">{project.summary}</p>
        <dl className="mt-7 grid gap-3 sm:grid-cols-2">
          {project.facts.map((fact) => (
            <div key={fact} className="rounded-2xl border border-line bg-white/70 px-4 py-3 text-[length:var(--step-small)] font-medium text-ink">
              {fact}
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
        {(project.caseStudySlug !== null || project.links.length > 0) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.caseStudySlug !== null && (
              <Button to={caseStudyPath(locale, project.caseStudySlug)}>
                {caseStudyLabel}
                <ArrowIcon />
              </Button>
            )}
            {project.links.map((link) => (
              <TextLink key={link.href} href={link.href} external={link.external} className="font-mono text-[length:var(--step-small)] font-medium text-ink">
                {link.label}
              </TextLink>
            ))}
          </div>
        )}
      </div>
      <div className={`relative min-h-[18rem] overflow-hidden bg-[linear-gradient(160deg,rgb(240_251_254),rgb(214_242_250)_70%,rgb(190_234_246))] ${reversed ? "lg:order-1" : ""}`}>
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
        <span aria-hidden="true" className="absolute top-4 right-6 font-display text-[7rem] leading-none font-[800] text-white/55" style={{ fontStretch: "120%" }}>
          {project.index}
        </span>
        <MascotView ref={viewRef} camera={PROJECT_CAMERA[project.id]} className="absolute inset-0 cursor-pointer" onClick={puppet.hop}>
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
    </article>
  );
}
