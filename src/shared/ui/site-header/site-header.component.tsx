import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { scrollToSection, scrollToTop } from "@/shared/animation/scroll-to.util";
import { homePath } from "@/shared/i18n/locale-path.util";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { Button } from "@/shared/ui/button/button.component";
import { LocaleSwitch } from "@/shared/ui/locale-switch/locale-switch.component";
import { HEADER_DESKTOP_QUERY, HEADER_SCROLLED_AT, MENU_LINK, NAV_LINK, SECTION_IDS } from "@/shared/ui/site-header/site-header.constants";
import { SoundToggle } from "@/shared/ui/sound-toggle/sound-toggle.component";

export function SiteHeader() {
  const { locale, content } = useLocale();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const home = homePath(locale);
  const onHome = pathname === home || pathname === `${home}/`;
  const nav = [
    { id: SECTION_IDS.about, label: content.ui.navAbout },
    { id: SECTION_IDS.cast, label: content.ui.navStack },
    { id: SECTION_IDS.projects, label: content.ui.navProjects },
    { id: SECTION_IDS.path, label: content.ui.navPath },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > HEADER_SCROLLED_AT);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const desktop = window.matchMedia(HEADER_DESKTOP_QUERY);
    const close = () => setMenuPath(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  const goTo = (id: string) => (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setMenuPath(null);
    if (onHome) {
      scrollToSection(id);
      return;
    }
    navigate(`${home}#${id}`);
  };

  const goTop = (event: MouseEvent<HTMLElement>) => {
    setMenuPath(null);
    if (onHome) {
      event.preventDefault();
      scrollToTop(true);
    }
  };

  const raised = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`page-container transition-[padding] duration-500 ease-[var(--ease-mass)] ${raised ? "pt-3" : "pt-5"}`}>
        <div className={`rounded-[1.75rem] transition-[background-color,box-shadow,border-color] duration-500 ${raised ? "glass" : "border border-transparent"} ${open ? "bg-white/95" : ""}`}>
          <div className="flex items-center justify-between gap-4 py-2 pr-2 pl-5">
            <Link to={home} onClick={goTop} className="flex shrink-0 items-baseline gap-0.5 whitespace-nowrap text-[length:1.05rem] font-[720] tracking-[-0.01em] text-ink" style={{ fontStretch: "110%" }}>
              {content.hero.firstName} {content.hero.lastName}
              <span className="text-accent">.</span>
            </Link>
            <nav className="hidden items-center gap-1 lg:flex" aria-label={content.ui.navProjects}>
              {nav.map((item) => (
                <a key={item.id} href={`${home}#${item.id}`} onClick={goTo(item.id)} className={NAV_LINK}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden items-center gap-1 lg:flex">
              <LocaleSwitch locale={locale} label={content.ui.localeSwitchLabel} />
              <SoundToggle labelOn={content.ui.soundOn} labelOff={content.ui.soundOff} />
              <Button size="sm" href={`${home}#${SECTION_IDS.contact}`} onClick={goTo(SECTION_IDS.contact)} className="ml-1">
                {content.ui.contactCta}
              </Button>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? content.ui.menuClose : content.ui.menuOpen}
              onClick={() => setMenuPath(open ? null : pathname)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white lg:hidden"
            >
              <span aria-hidden="true" className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-[var(--ease-mass)] ${open ? "rotate-45" : "-translate-y-[3.5px]"}`} />
              <span aria-hidden="true" className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-[var(--ease-mass)] ${open ? "-rotate-45" : "translate-y-[3.5px]"}`} />
            </button>
          </div>
          <div
            id="site-menu"
            inert={!open}
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-mass)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <nav className="grid gap-0.5 px-2 pt-1 pb-2" aria-label={content.ui.navProjects}>
                {nav.map((item) => (
                  <a key={item.id} href={`${home}#${item.id}`} onClick={goTo(item.id)} className={MENU_LINK}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-2 border-t border-line px-3 py-3">
                <LocaleSwitch locale={locale} label={content.ui.localeSwitchLabel} />
                <SoundToggle labelOn={content.ui.soundOn} labelOff={content.ui.soundOff} />
                <Button size="sm" href={`${home}#${SECTION_IDS.contact}`} onClick={goTo(SECTION_IDS.contact)} className="ml-auto">
                  {content.ui.contactCta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
