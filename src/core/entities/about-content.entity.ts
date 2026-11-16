export interface AboutFact {
  readonly label: string;
  readonly value: string;
}

export interface AboutContent {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly facts: readonly AboutFact[];
}
