import type { SiteContent } from "@/core/entities/site-content.entity";
import { Locale } from "@/core/enums/locale.enum";
import { ABOUT_PT_BR } from "@/data/content/pt-br/about.content";
import { CASE_STUDIES_PT_BR } from "@/data/content/pt-br/case-studies.content";
import { CAST_PT_BR } from "@/data/content/pt-br/cast.content";
import { CONTACT_PT_BR } from "@/data/content/pt-br/contact.content";
import { FOOTER_PT_BR } from "@/data/content/pt-br/footer.content";
import { HERO_PT_BR } from "@/data/content/pt-br/hero.content";
import { PROJECTS_PT_BR } from "@/data/content/pt-br/projects.content";
import { TIMELINE_PT_BR } from "@/data/content/pt-br/timeline.content";
import { UI_PT_BR } from "@/data/content/pt-br/ui.content";

export const SITE_PT_BR: SiteContent = {
  locale: Locale.PtBr,
  hero: HERO_PT_BR,
  about: ABOUT_PT_BR,
  cast: CAST_PT_BR,
  projects: PROJECTS_PT_BR,
  timeline: TIMELINE_PT_BR,
  contact: CONTACT_PT_BR,
  footer: FOOTER_PT_BR,
  ui: UI_PT_BR,
  caseStudies: CASE_STUDIES_PT_BR,
};
