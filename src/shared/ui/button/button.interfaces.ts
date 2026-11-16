import type { MouseEvent, ReactNode } from "react";

export type ButtonVariant = "accent" | "glass" | "ghost";
export type ButtonSize = "md" | "sm";

export interface ButtonProps {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly href?: string;
  readonly to?: string;
  readonly external?: boolean;
  readonly className?: string;
  readonly onClick?: (event: MouseEvent<HTMLElement>) => void;
}
