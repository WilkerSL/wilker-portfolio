import { useLocale } from "@/shared/i18n/use-locale.hook";
import { TextLink } from "@/shared/ui/text-link/text-link.component";

export function SiteFooter() {
  const { content } = useLocale();
  const { footer } = content;

  return (
    <footer className="border-t border-line bg-snow">
      <div className="page-container grid gap-10 py-14 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-[46rem]">
          <p className="text-[length:var(--step-small)] font-semibold text-ink">{footer.creditsTitle}</p>
          <ul className="mt-4 grid gap-1.5 text-[length:var(--step-small)] text-mute">
            {footer.credits.map((credit) => (
              <li key={credit.subject}>
                <span className="font-medium text-ink">{credit.subject}</span> {credit.text}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[length:var(--step-micro)] leading-relaxed text-faint">{footer.notice}</p>
        </div>
        <div className="flex flex-col items-start gap-2 font-mono text-[length:var(--step-micro)] text-mute md:items-end">
          <TextLink href={footer.sourceHref} external>
            {footer.sourceLabel}
          </TextLink>
          <span>{footer.signature}</span>
        </div>
      </div>
    </footer>
  );
}
