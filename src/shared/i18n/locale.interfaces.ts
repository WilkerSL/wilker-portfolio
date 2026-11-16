import type { SiteContent } from "@/core/entities/site-content.entity";
import type { Locale } from "@/core/enums/locale.enum";

export interface LocaleContextValue {
  readonly locale: Locale;
  readonly content: SiteContent;
}
