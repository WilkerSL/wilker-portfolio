import type { SiteContent } from "@/core/entities/site-content.entity";
import { Locale } from "@/core/enums/locale.enum";
import { ABOUT_EN } from "@/data/content/en/about.content";
import { CASE_STUDIES_EN } from "@/data/content/en/case-studies.content";
import { CAST_EN } from "@/data/content/en/cast.content";
import { CONTACT_EN } from "@/data/content/en/contact.content";
import { FOOTER_EN } from "@/data/content/en/footer.content";
import { HERO_EN } from "@/data/content/en/hero.content";
import { PROJECTS_EN } from "@/data/content/en/projects.content";
import { TIMELINE_EN } from "@/data/content/en/timeline.content";
import { UI_EN } from "@/data/content/en/ui.content";

export const SITE_EN: SiteContent = {
  locale: Locale.En,
  hero: HERO_EN,
  about: ABOUT_EN,
  cast: CAST_EN,
  projects: PROJECTS_EN,
  timeline: TIMELINE_EN,
  contact: CONTACT_EN,
  footer: FOOTER_EN,
  ui: UI_EN,
  caseStudies: CASE_STUDIES_EN,
};
