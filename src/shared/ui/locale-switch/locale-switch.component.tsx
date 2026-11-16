import { Link, useLocation } from "react-router";
import { rememberLocale } from "@/shared/i18n/locale-detection.util";
import { equivalentPath, otherLocale } from "@/shared/i18n/locale-path.util";
import type { LocaleSwitchProps } from "@/shared/ui/locale-switch/locale-switch.interfaces";

export function LocaleSwitch({ locale, label }: LocaleSwitchProps) {
  const { pathname } = useLocation();
  const target = otherLocale(locale);

  return (
    <Link
      to={equivalentPath(pathname, target)}
      hrefLang={target}
      onClick={() => rememberLocale(target)}
      className="rounded-full px-3 py-1.5 font-mono text-[length:var(--step-micro)] font-medium text-mute transition-colors hover:bg-white hover:text-ink"
    >
      {label}
    </Link>
  );
}
