import type { CastMemberId } from "@/core/enums/cast-member-id.enum";
import type { Proficiency } from "@/core/enums/proficiency.enum";

export interface CastMember {
  readonly id: CastMemberId;
  readonly name: string;
  readonly techs: readonly string[];
  readonly proficiency: Proficiency;
  readonly summary: string;
}

export interface CastContent {
  readonly title: string;
  readonly lead: string;
  readonly members: readonly CastMember[];
  readonly proficiencyLabels: Readonly<Record<Proficiency, string>>;
}
