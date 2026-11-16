import type { ReactNode } from "react";
import type { ChipTone } from "@/shared/ui/chip/chip.types";

export interface ChipProps {
  readonly children: ReactNode;
  readonly tone?: ChipTone;
}
