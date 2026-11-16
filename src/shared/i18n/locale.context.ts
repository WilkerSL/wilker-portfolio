import { createContext } from "react";
import type { LocaleContextValue } from "@/shared/i18n/locale.interfaces";

export const LocaleContext = createContext<LocaleContextValue | null>(null);
