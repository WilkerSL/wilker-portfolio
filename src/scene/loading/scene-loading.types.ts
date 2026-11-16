export interface SceneLoadingStore {
  readonly ready: boolean;
  markReady(): void;
}

export interface WarmupContentProps {
  readonly onReady: () => void;
}
