import type { FooterContent } from "@/core/entities/footer-content.entity";
import { PROFILE } from "@/data/content/shared/profile.constants";

export const FOOTER_EN: FooterContent = {
  signature: `${PROFILE.displayName}, 2026`,
  sourceLabel: "site source",
  sourceHref: PROFILE.siteSourceUrl,
  creditsTitle: "mascots",
  credits: [
    { subject: "Gopher", text: "created by Renée French, CC BY 4.0 license" },
    { subject: "Duke", text: "the Java mascot, BSD license" },
    { subject: "dotnet-bot", text: "the .NET Foundation mascot" },
    { subject: "Ferris", text: "created by Karen Rustad Tölva, public domain" },
  ],
  notice: "Go, Java, .NET, Rust, React, TypeScript, Spring and Python are trademarks of their owners. The mascots appear here as a tribute.",
};
