import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Locale } from "@/core/enums/locale.enum";
import { browserLocale, storedLocale } from "@/shared/i18n/locale-detection.util";
import { equivalentPath, localeFromPathname } from "@/shared/i18n/locale-path.util";

let checked = false;

export function useLocaleRedirect(): void {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      return;
    }
    checked = true;
    if (storedLocale() !== null || localeFromPathname(pathname) !== Locale.PtBr) {
      return;
    }
    if (browserLocale(navigator.languages ?? [navigator.language]) === Locale.En) {
      navigate(equivalentPath(pathname, Locale.En), { replace: true });
    }
  }, [pathname, navigate]);
}
