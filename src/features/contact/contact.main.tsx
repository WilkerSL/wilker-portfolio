import { useRef } from "react";
import { useReveal } from "@/shared/animation/use-reveal.hook";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { SectionHeading } from "@/shared/ui/section-heading/section-heading.component";
import { SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { TextLink } from "@/shared/ui/text-link/text-link.component";
import { ContactLineup } from "@/features/contact/contact-lineup.component";
import { CopyEmailButton } from "@/features/contact/copy-email-button.component";

export function ContactMain() {
  const { content } = useLocale();
  const { contact } = content;
  const scope = useRef<HTMLElement>(null);
  useReveal(scope);

  return (
    <section id={SECTION_IDS.contact} ref={scope} className="section-space relative">
      <div className="page-container">
        <div data-reveal className="glass-accent relative overflow-hidden rounded-[2.25rem] px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_80%_50%,black,transparent_70%)]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <SectionHeading title={contact.title} lead={contact.line} inverted />
              <CopyEmailButton email={contact.email} copyHint={contact.copyHint} copiedLabel={contact.copiedLabel} />
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[length:var(--step-small)]">
                {contact.channels
                  .filter((channel) => !channel.href.startsWith("mailto:"))
                  .map((channel) => (
                    <li key={channel.id}>
                      <span className="mr-2 text-white/65">{channel.label}</span>
                      <TextLink href={channel.href} external className="font-medium text-white hover:!text-white">
                        {channel.handle}
                      </TextLink>
                    </li>
                  ))}
              </ul>
            </div>
            <ContactLineup />
          </div>
        </div>
      </div>
    </section>
  );
}
