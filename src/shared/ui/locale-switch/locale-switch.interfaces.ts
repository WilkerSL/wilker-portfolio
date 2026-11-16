import type { Locale } from "@/core/enums/locale.enum";

export interface LocaleSwitchProps {
  readonly locale: Locale;
  readonly label: string;
}
