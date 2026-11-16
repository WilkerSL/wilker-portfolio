import type { TimelineBranch } from "@/core/enums/timeline-branch.enum";

export interface TimelineCommit {
  readonly hash: string;
  readonly year: string;
  readonly branch: TimelineBranch;
  readonly message: string;
  readonly detail: string;
}

export interface TimelineContent {
  readonly title: string;
  readonly command: string;
  readonly commits: readonly TimelineCommit[];
  readonly branchLabels: Readonly<Record<TimelineBranch, string>>;
}
