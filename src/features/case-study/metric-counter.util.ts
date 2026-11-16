import { HTML_LANG } from "@/shared/i18n/locale-routes.constants";
import type { Locale } from "@/core/enums/locale.enum";

export function metricTarget(value: string): number {
  const digits = value.replace(/\D/g, "");
  return digits.length === 0 ? 0 : Number(digits);
}

export function formatMetric(value: number, locale: Locale): string {
  return new Intl.NumberFormat(HTML_LANG[locale], { maximumFractionDigits: 0 }).format(Math.round(value));
}
