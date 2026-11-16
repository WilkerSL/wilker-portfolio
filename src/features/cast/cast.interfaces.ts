import type { CastMember } from "@/core/entities/cast-content.entity";
import type { MascotState } from "@/scene/mascots/shared/mascot-state.types";
import type { CastMascot } from "@/features/cast/cast.types";

export interface CastCardProps {
  readonly member: CastMember;
  readonly proficiencyLabel: string;
}

export interface CastMascotModelProps {
  readonly mascot: CastMascot;
  readonly state: MascotState;
}
