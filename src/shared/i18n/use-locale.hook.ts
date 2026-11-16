import { useContext } from "react";
import { LocaleContext } from "@/shared/i18n/locale.context";
import type { LocaleContextValue } from "@/shared/i18n/locale.interfaces";

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (value === null) {
    throw new Error("useLocale must be used inside a locale layout");
  }
  return value;
}
