import type { ContactContent } from "@/core/entities/contact-content.entity";
import { ContactChannelId } from "@/core/enums/contact-channel-id.enum";
import { PROFILE } from "@/data/content/shared/profile.constants";

export const CONTACT_PT_BR: ContactContent = {
  title: "Vamos conversar",
  line: "Respondo por email e pelo LinkedIn.",
  email: PROFILE.email,
  copyHint: "clique para copiar",
  copiedLabel: "copiado",
  channels: [
    { id: ContactChannelId.Email, label: "email", href: `mailto:${PROFILE.email}`, handle: PROFILE.email },
    { id: ContactChannelId.LinkedIn, label: "LinkedIn", href: PROFILE.linkedInUrl, handle: PROFILE.linkedInHandle },
    { id: ContactChannelId.GitHub, label: "GitHub", href: PROFILE.gitHubUrl, handle: PROFILE.gitHubHandle },
  ],
};
