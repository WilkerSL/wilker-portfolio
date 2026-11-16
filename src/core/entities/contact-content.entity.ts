import type { ContactChannelId } from "@/core/enums/contact-channel-id.enum";

export interface ContactChannel {
  readonly id: ContactChannelId;
  readonly label: string;
  readonly href: string;
  readonly handle: string;
}

export interface ContactContent {
  readonly title: string;
  readonly line: string;
  readonly email: string;
  readonly copyHint: string;
  readonly copiedLabel: string;
  readonly channels: readonly ContactChannel[];
}
