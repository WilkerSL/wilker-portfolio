import type { SiteContent } from "@/core/entities/site-content.entity";
import type { CaseStudy } from "@/core/entities/case-study.entity";
import type { Locale } from "@/core/enums/locale.enum";

export interface ContentPort {
  getSite(locale: Locale): SiteContent;
  findCaseStudy(locale: Locale, slug: string): CaseStudy | null;
}
