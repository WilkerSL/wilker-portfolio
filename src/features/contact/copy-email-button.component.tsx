import { useState } from "react";
import { playSfx } from "@/shared/audio/sfx.service";
import { CONTACT_COPIED_MS } from "@/features/contact/contact.constants";
import type { CopyEmailButtonProps } from "@/features/contact/contact.interfaces";

export function CopyEmailButton({ email, copyHint, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      playSfx("pop", { pitch: 1.25 });
      window.setTimeout(() => setCopied(false), CONTACT_COPIED_MS);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="group glass mt-9 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full py-2.5 pr-3 pl-5 text-left text-ink transition-transform duration-300 ease-[var(--ease-mass)] hover:-translate-y-0.5"
    >
      <span className="font-mono text-[length:var(--step-small)] font-medium break-all">{email}</span>
      <span className={`rounded-full px-3 py-1 font-mono text-[length:var(--step-micro)] ${copied ? "bg-ink text-white" : "bg-accent-soft text-accent-strong"}`}>
        {copied ? copiedLabel : copyHint}
      </span>
    </button>
  );
}
