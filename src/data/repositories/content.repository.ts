import type { CaseStudy } from "@/core/entities/case-study.entity";
import type { SiteContent } from "@/core/entities/site-content.entity";
import { Locale } from "@/core/enums/locale.enum";
import type { ContentPort } from "@/core/ports/content.port";
import { SITE_EN } from "@/data/content/en/site.content";
import { SITE_PT_BR } from "@/data/content/pt-br/site.content";

const SITES: Readonly<Record<Locale, SiteContent>> = {
  [Locale.PtBr]: SITE_PT_BR,
  [Locale.En]: SITE_EN,
};

export const contentRepository: ContentPort = {
  getSite(locale) {
    return SITES[locale];
  },
  findCaseStudy(locale, slug): CaseStudy | null {
    return SITES[locale].caseStudies.find((study) => study.slug === slug) ?? null;
  },
};
