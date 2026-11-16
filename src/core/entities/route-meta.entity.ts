import type { Locale } from "@/core/enums/locale.enum";

export interface RouteMeta {
  readonly key: string;
  readonly path: string;
  readonly locale: Locale;
  readonly title: string;
  readonly description: string;
  readonly alternates: Readonly<Record<Locale, string>>;
}
