export interface FooterCredit {
  readonly subject: string;
  readonly text: string;
}

export interface FooterContent {
  readonly signature: string;
  readonly sourceLabel: string;
  readonly sourceHref: string;
  readonly creditsTitle: string;
  readonly credits: readonly FooterCredit[];
  readonly notice: string;
}
