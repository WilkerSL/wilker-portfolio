import { useRef } from "react";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { SectionHeading } from "@/shared/ui/section-heading/section-heading.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { CastCard } from "@/features/cast/cast-card.component";

export function CastMain() {
  const { content } = useLocale();
  const { cast } = content;
  const scope = useRef<HTMLElement>(null);
  useReveal(scope);

  return (
    <section id={SECTION_IDS.cast} ref={scope} className="section-space relative bg-snow">
      <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
      <div className="page-container relative">
        <SectionHeading title={cast.title} lead={cast.lead} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cast.members.map((member) => (
            <CastCard key={member.id} member={member} proficiencyLabel={cast.proficiencyLabels[member.proficiency]} />
          ))}
        </div>
      </div>
    </section>
  );
}
