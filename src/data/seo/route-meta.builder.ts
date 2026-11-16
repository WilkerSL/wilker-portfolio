import type { RouteMeta } from "@/core/entities/route-meta.entity";
import { Locale } from "@/core/enums/locale.enum";
import { contentRepository } from "@/data/repositories/content.repository";
import { PROFILE } from "@/data/content/shared/profile.constants";
import { caseStudyPath, homePath } from "@/shared/i18n/locale-path.util";

const LOCALES: readonly Locale[] = [Locale.PtBr, Locale.En];

function homeMeta(locale: Locale): RouteMeta {
  const site = contentRepository.getSite(locale);
  return {
    key: "home",
    path: homePath(locale),
    locale,
    title: `${PROFILE.displayName} · ${site.hero.role}`,
    description: site.hero.line,
    alternates: { [Locale.PtBr]: homePath(Locale.PtBr), [Locale.En]: homePath(Locale.En) },
  };
}

function caseStudyMetas(locale: Locale): RouteMeta[] {
  return contentRepository.getSite(locale).caseStudies.map((study) => ({
    key: `case-study:${study.slug}`,
    path: caseStudyPath(locale, study.slug),
    locale,
    title: `${study.title} · ${PROFILE.displayName}`,
    description: study.summary,
    alternates: {
      [Locale.PtBr]: caseStudyPath(Locale.PtBr, study.slug),
      [Locale.En]: caseStudyPath(Locale.En, study.slug),
    },
  }));
}

export function buildRouteMetas(): RouteMeta[] {
  return LOCALES.flatMap((locale) => [homeMeta(locale), ...caseStudyMetas(locale)]);
}

export function findRouteMeta(pathname: string): RouteMeta | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return buildRouteMetas().find((meta) => meta.path === normalized) ?? null;
}
