import { homePath } from "@/shared/i18n/locale-path.util";
import { useLocale } from "@/shared/i18n/use-locale.hook";
import { Button } from "@/shared/ui/button/button.component";
import { ArrowIcon } from "@/shared/ui/icons/arrow-icon.component";

export function NotFoundMain() {
  const { locale, content } = useLocale();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div aria-hidden="true" className="accent-orb top-[-10rem] right-[-8rem] h-[34rem] w-[34rem] opacity-50" />
      <div className="page-container relative">
        <p className="font-mono text-[length:var(--step-small)] font-medium text-accent-strong">{content.ui.notFoundTitle}</p>
        <h1 className="mt-5 text-[length:var(--step-title)] leading-[1.02] font-[760] tracking-[-0.03em]" style={{ fontStretch: "110%" }}>
          {content.ui.notFoundLine}
        </h1>
        <Button to={homePath(locale)} className="mt-10">
          {content.ui.backHome}
          <ArrowIcon />
        </Button>
      </div>
    </section>
  );
}
