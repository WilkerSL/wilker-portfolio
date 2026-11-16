import type { FooterContent } from "@/core/entities/footer-content.entity";
import { PROFILE } from "@/data/content/shared/profile.constants";

export const FOOTER_PT_BR: FooterContent = {
  signature: `${PROFILE.displayName}, 2026`,
  sourceLabel: "código do site",
  sourceHref: PROFILE.siteSourceUrl,
  creditsTitle: "mascotes",
  credits: [
    { subject: "Gopher", text: "criado por Renée French, licença CC BY 4.0" },
    { subject: "Duke", text: "mascote do Java, licença BSD" },
    { subject: "dotnet-bot", text: "mascote da .NET Foundation" },
    { subject: "Ferris", text: "criado por Karen Rustad Tölva, domínio público" },
  ],
  notice: "Go, Java, .NET, Rust, React, TypeScript, Spring e Python são marcas dos seus donos. Os mascotes aparecem aqui como homenagem.",
};
