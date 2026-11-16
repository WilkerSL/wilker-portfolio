import { Locale } from "@/core/enums/locale.enum";

export const DEFAULT_LOCALE: Locale = Locale.PtBr;

export const LOCALE_BASE_PATH: Readonly<Record<Locale, string>> = {
  [Locale.PtBr]: "",
  [Locale.En]: "/en",
};

export const CASE_STUDY_SEGMENT: Readonly<Record<Locale, string>> = {
  [Locale.PtBr]: "projetos",
  [Locale.En]: "projects",
};

export const HTML_LANG: Readonly<Record<Locale, string>> = {
  [Locale.PtBr]: "pt-BR",
  [Locale.En]: "en",
};

export const OG_LOCALE: Readonly<Record<Locale, string>> = {
  [Locale.PtBr]: "pt_BR",
  [Locale.En]: "en_US",
};

export const LOCALE_STORAGE_KEY = "wl.locale";
