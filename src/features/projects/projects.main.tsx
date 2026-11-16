import { useRef } from "react";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { SectionHeading } from "@/shared/ui/section-heading/section-heading.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { ProjectCard } from "@/features/projects/project-card.component";

export function ProjectsMain() {
  const { locale, content } = useLocale();
  const { projects } = content;
  const scope = useRef<HTMLElement>(null);
  useReveal(scope);

  return (
    <section id={SECTION_IDS.projects} ref={scope} className="section-space relative">
      <div className="page-container">
        <SectionHeading title={projects.title} />
        <div className="mt-14 grid gap-7">
          {projects.items.map((project, index) => (
            <ProjectCard key={project.id} project={project} locale={locale} caseStudyLabel={projects.caseStudyLabel} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
