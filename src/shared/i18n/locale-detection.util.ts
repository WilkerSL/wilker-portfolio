import { Locale } from "@/core/enums/locale.enum";
import { LOCALE_STORAGE_KEY } from "@/shared/i18n/locale-routes.constants";
import { readStorage, writeStorage } from "@/shared/utils/storage.util";

function isLocale(value: string | null): value is Locale {
  return value === Locale.PtBr || value === Locale.En;
}

export function storedLocale(): Locale | null {
  const value = readStorage(LOCALE_STORAGE_KEY);
  return isLocale(value) ? value : null;
}

export function rememberLocale(locale: Locale): void {
  writeStorage(LOCALE_STORAGE_KEY, locale);
}

export function browserLocale(languages: readonly string[]): Locale {
  return languages.some((language) => language.toLowerCase().startsWith("pt")) ? Locale.PtBr : Locale.En;
}
