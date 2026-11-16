import { Locale } from "@/core/enums/locale.enum";
import { CASE_STUDY_SEGMENT, LOCALE_BASE_PATH } from "@/shared/i18n/locale-routes.constants";

const LOCALES: readonly Locale[] = [Locale.PtBr, Locale.En];

export function homePath(locale: Locale): string {
  return LOCALE_BASE_PATH[locale] || "/";
}

export function caseStudyPath(locale: Locale, slug: string): string {
  return `${LOCALE_BASE_PATH[locale]}/${CASE_STUDY_SEGMENT[locale]}/${slug}`;
}

export function localeFromPathname(pathname: string): Locale {
  const english = LOCALE_BASE_PATH[Locale.En];
  return pathname === english || pathname.startsWith(`${english}/`) ? Locale.En : Locale.PtBr;
}

export function caseStudySlugFromPathname(pathname: string): string | null {
  const locale = localeFromPathname(pathname);
  const prefix = `${LOCALE_BASE_PATH[locale]}/${CASE_STUDY_SEGMENT[locale]}/`;
  if (!pathname.startsWith(prefix)) {
    return null;
  }
  const slug = pathname.slice(prefix.length).replace(/\/+$/, "");
  return slug.length > 0 && !slug.includes("/") ? slug : null;
}

export function equivalentPath(pathname: string, target: Locale): string {
  const slug = caseStudySlugFromPathname(pathname);
  return slug === null ? homePath(target) : caseStudyPath(target, slug);
}

export function otherLocale(locale: Locale): Locale {
  return LOCALES.find((candidate) => candidate !== locale) ?? Locale.PtBr;
}
