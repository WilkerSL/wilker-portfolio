import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { useLocation, useOutlet } from "react-router";
import { contentRepository } from "@/data/repositories/content.repository";
import { PROFILE } from "@/data/content/shared/profile.constants";
import { ScrollTrigger } from "@/shared/animation/gsap.setup";
import { SmoothScroll } from "@/shared/animation/smooth-scroll.component";
import { playSfx } from "@/shared/audio/sfx.service";
import { LocaleContext } from "@/shared/i18n/locale.context";
import { useLocaleRedirect } from "@/shared/i18n/use-locale-redirect.hook";
import { SiteFooter } from "@/shared/ui/site-footer/site-footer.component";
import { SiteHeader } from "@/shared/ui/site-header/site-header.component";
import { useDocumentMeta } from "@/app/hooks/use-document-meta.hook";
import { useRouteScroll } from "@/app/hooks/use-route-scroll.hook";
import type { LocaleLayoutProps } from "@/app/layouts/locale-layout.interfaces";
import { ROUTE_TRANSITION } from "@/app/layouts/route-transition.constants";

export function LocaleLayout({ locale }: LocaleLayoutProps) {
  const value = useMemo(() => ({ locale, content: contentRepository.getSite(locale) }), [locale]);
  const location = useLocation();
  const outlet = useOutlet();
  useDocumentMeta(PROFILE.displayName);
  useLocaleRedirect();
  useRouteScroll();

  return (
    <LocaleContext value={value}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {value.content.ui.skipToContent}
      </a>
      <SiteHeader />
      <SmoothScroll>
        <div className="app-frame">
          <AnimatePresence mode="wait" onExitComplete={() => playSfx("whoosh", { volume: 0.6 })}>
            <motion.main
              key={location.pathname}
              id="main"
              initial={ROUTE_TRANSITION.initial}
              animate={ROUTE_TRANSITION.animate}
              exit={ROUTE_TRANSITION.exit}
              transition={ROUTE_TRANSITION.transition}
              onAnimationComplete={() => ScrollTrigger.refresh()}
            >
              {outlet}
            </motion.main>
          </AnimatePresence>
          <SiteFooter />
        </div>
      </SmoothScroll>
    </LocaleContext>
  );
}
