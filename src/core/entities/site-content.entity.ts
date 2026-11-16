import type { Locale } from "@/core/enums/locale.enum";
import type { AboutContent } from "@/core/entities/about-content.entity";
import type { CaseStudy } from "@/core/entities/case-study.entity";
import type { CastContent } from "@/core/entities/cast-content.entity";
import type { ContactContent } from "@/core/entities/contact-content.entity";
import type { FooterContent } from "@/core/entities/footer-content.entity";
import type { HeroContent } from "@/core/entities/hero-content.entity";
import type { ProjectsContent } from "@/core/entities/project.entity";
import type { TimelineContent } from "@/core/entities/timeline-content.entity";
import type { UiLabels } from "@/core/entities/ui-labels.entity";

export interface SiteContent {
  readonly locale: Locale;
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly cast: CastContent;
  readonly projects: ProjectsContent;
  readonly timeline: TimelineContent;
  readonly contact: ContactContent;
  readonly footer: FooterContent;
  readonly ui: UiLabels;
  readonly caseStudies: readonly CaseStudy[];
}
