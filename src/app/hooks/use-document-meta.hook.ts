import { useEffect } from "react";
import { useLocation } from "react-router";
import { findRouteMeta } from "@/data/seo/route-meta.builder";
import { HTML_LANG } from "@/shared/i18n/locale-routes.constants";
import { localeFromPathname } from "@/shared/i18n/locale-path.util";

function setMetaDescription(content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (element === null) {
    element = document.createElement("meta");
    element.name = "description";
    document.head.append(element);
  }
  element.content = content;
}

export function useDocumentMeta(fallbackTitle: string): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = findRouteMeta(pathname);
    document.documentElement.lang = HTML_LANG[localeFromPathname(pathname)];
    document.title = meta?.title ?? fallbackTitle;
    if (meta !== null) {
      setMetaDescription(meta.description);
    }
  }, [pathname, fallbackTitle]);
}
