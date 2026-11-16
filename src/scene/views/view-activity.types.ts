export interface ViewActivityStore {
  readonly visible: number;
  show(): void;
  hide(): void;
}
